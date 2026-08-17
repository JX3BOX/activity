const JSON_FIELDS = ["content", "snapshot", "talent_code", "talent_pzcode", "competition_adjustments"];
const MAX_SCHEMA_BYTES = 256 * 1024;
const SNAPSHOT_SCHEMA_FIELDS = [
    "id",
    "title",
    "client",
    "mount",
    "role_type",
    "weapon_mode",
    "is_tertiary",
    "global_level",
    "zlp",
    "content",
    "snapshot",
    "overview",
    "talent_code",
    "talent_id",
    "talent_pzcode",
    "body_type",
    "competition_adjustments",
    "user_id",
    "pz_author_info",
    "created_at",
    "updated_at",
];

const clone = (value) => JSON.parse(JSON.stringify(value));

export const PZ_EQUIPMENT_SLOTS = Object.freeze([
    { value: "HAT", label: "帽子", type: 7 },
    { value: "JACKET", label: "上衣", type: 7 },
    { value: "BELT", label: "腰带", type: 7 },
    { value: "WRIST", label: "护腕", type: 7 },
    { value: "BOTTOMS", label: "下装", type: 7 },
    { value: "SHOES", label: "鞋子", type: 7 },
    { value: "NECKLACE", label: "项链", type: 8 },
    { value: "PENDANT", label: "腰坠", type: 8 },
    { value: "RING_1", label: "戒指一", type: 8 },
    { value: "RING_2", label: "戒指二", type: 8 },
    { value: "PRIMARY_WEAPON", label: "主武器", type: 6 },
    { value: "TERTIARY_WEAPON", label: "重兵", type: 6 },
    { value: "SECONDARY_WEAPON", label: "暗器", type: 6 },
]);

const EQUIPMENT_TYPE_BY_SLOT = Object.fromEntries(PZ_EQUIPMENT_SLOTS.map((slot) => [slot.value, slot.type]));

const adjustmentRecord = (schema) => {
    const current = schema?.competition_adjustments;
    return current && typeof current === "object" && !Array.isArray(current)
        ? clone(current)
        : { version: 1, removed_equipment: {} };
};

export const lockedEquipmentSlots = (restrictions) =>
    [
        ...new Set(
            (restrictions || [])
                .filter((restriction) => restriction?.kind === "disable_equip_slot")
                .flatMap((restriction) => restriction.values || [])
                .map((value) => String(value && typeof value === "object" ? value.value ?? value.name : value))
                .filter((value) => EQUIPMENT_TYPE_BY_SLOT[value])
        ),
    ];

export const removedEquipmentSlots = (pzSnapshot) =>
    Object.keys(pzSnapshot?.schema?.competition_adjustments?.removed_equipment || {}).filter(
        (slot) => EQUIPMENT_TYPE_BY_SLOT[slot]
    );

export const availableEquipmentSlots = (pzSnapshot) => {
    const content = pzSnapshot?.schema?.content || {};
    const removed = pzSnapshot?.schema?.competition_adjustments?.removed_equipment || {};
    return PZ_EQUIPMENT_SLOTS.filter((slot) => content[slot.value]?.equip || removed[slot.value]?.equip);
};

export const applyEquipmentRemoval = (pzSnapshot, selectedSlots, forcedSlots = []) => {
    const next = clone(pzSnapshot);
    const schema = next?.schema;
    if (!schema || !schema.content || typeof schema.content !== "object" || Array.isArray(schema.content)) {
        throw new Error("当前配装缺少可调整的装备数据");
    }
    const adjustments = adjustmentRecord(schema);
    const removed = adjustments.removed_equipment || {};
    const selected = new Set([...(selectedSlots || []), ...(forcedSlots || [])]);

    for (const slot of PZ_EQUIPMENT_SLOTS) {
        const key = slot.value;
        if (selected.has(key) && schema.content[key]?.equip) {
            removed[key] = clone(schema.content[key]);
            delete schema.content[key];
        } else if (!selected.has(key) && removed[key]?.equip) {
            schema.content[key] = clone(removed[key]);
            delete removed[key];
        }
    }
    if (!Object.values(schema.content).some((item) => item?.equip)) {
        throw new Error("至少需要保留一件装备，不能卸下全部部位");
    }
    adjustments.version = 1;
    adjustments.removed_equipment = removed;
    schema.competition_adjustments = adjustments;
    return next;
};

export const applyTalentAdjustment = (pzSnapshot, talentCode, talentOverview) => {
    const next = clone(pzSnapshot);
    const schema = next?.schema;
    if (!schema) throw new Error("当前配装缺少奇穴数据");
    const adjustments = adjustmentRecord(schema);
    if (!("original_talent_code" in adjustments)) {
        adjustments.original_talent_code = clone(schema.talent_code ?? null);
        adjustments.original_talent_pzcode = clone(schema.talent_pzcode ?? []);
        adjustments.original_talent_id = schema.talent_id ?? null;
    }
    schema.talent_code = clone(talentCode);
    schema.talent_pzcode = clone(talentOverview);
    schema.talent_id = null;
    schema.competition_adjustments = adjustments;
    return next;
};

export const buildPzJbbb = (pzSnapshot) => {
    const schema = pzSnapshot?.schema || {};
    if (schema.client && schema.client !== "std") throw new Error("本场配装调整目前仅支持正式服");
    const content = schema.content;
    if (!content || typeof content !== "object" || Array.isArray(content)) {
        throw new Error("当前配装缺少装备明细，无法重新计算");
    }
    const EquipList = {};
    for (const [slot, item] of Object.entries(content)) {
        const type = EQUIPMENT_TYPE_BY_SLOT[slot];
        if (!type || !item?.equip) continue;
        const { equip, skill, ...rest } = clone(item);
        EquipList[slot] = { ...rest, id: `${type}_${equip}` };
    }
    if (!Object.keys(EquipList).length) throw new Error("至少需要保留一件装备");
    return {
        Title: String(schema.title || "本场调整配装"),
        EquipList,
        TalentCode: (schema.talent_pzcode || [])
            .map((talent) => ({ id: Number(talent?.id), name: String(talent?.name || "") }))
            .filter((talent) => Number.isInteger(talent.id) && talent.id > 0),
        Mount: Number(schema.mount || 0),
        Client: "std",
        BodyType: Number(schema.body_type || 0),
    };
};

export const mergeCalculatedPzSnapshot = (pzSnapshot, calculatedSchema) => {
    const next = clone(pzSnapshot);
    const calculated = clone(calculatedSchema || {});
    for (const field of ["snapshot", "overview", "attrs", "talent_pzcode", "weapon_mode", "is_tertiary"]) {
        if (calculated[field] !== undefined) next.schema[field] = calculated[field];
    }
    next.schema.client = "std";
    return next;
};

const parseJsonField = (value, field) => {
    let result = value;
    let depth = 0;
    while (typeof result === "string" && depth < 3) {
        try {
            result = JSON.parse(result);
        } catch (error) {
            throw new Error(`配装中的${field}数据无法识别，请打开原配装重新保存后再试`);
        }
        depth += 1;
    }
    return result;
};

export const parsePzId = (input) => {
    const value = String(input ?? "").trim();
    if (/^[1-9]\d*$/.test(value)) return Number(value);

    try {
        const url = new URL(value);
        const queryId = url.searchParams.get("id");
        if (/^[1-9]\d*$/.test(queryId || "")) return Number(queryId);

        const pathId = url.pathname.match(/\/pz\/(?:view|edit)\/([1-9]\d*)\/?$/)?.[1];
        if (pathId) return Number(pathId);

        const apiId = url.pathname.match(/\/api\/cms\/app\/pz\/([1-9]\d*)\/?$/)?.[1];
        if (apiId) return Number(apiId);
    } catch (error) {
        // 非完整网址继续交给统一格式提示。
    }

    throw new Error("请输入魔盒配装方案编号，或粘贴配装详情、编辑页链接");
};

export const buildPzSnapshot = (rawSchema, expectedId) => {
    if (!rawSchema || typeof rawSchema !== "object" || Array.isArray(rawSchema)) {
        throw new Error("没有读取到可用的配装内容");
    }

    const normalized = clone(rawSchema);
    JSON_FIELDS.forEach((field) => {
        if (normalized[field] != null) normalized[field] = parseJsonField(normalized[field], field);
    });

    const id = Number(normalized.id);
    if (!Number.isInteger(id) || id <= 0 || id !== Number(expectedId)) {
        throw new Error("返回的配装方案与填写的编号不一致，请重新读取");
    }
    if (!normalized.overview || typeof normalized.overview !== "object") {
        throw new Error("该配装缺少预览数据，请打开原配装重新保存后再试");
    }
    if (typeof normalized.updated_at !== "string" || !normalized.updated_at.trim()) {
        throw new Error("该配装缺少最近更新时间，请打开原配装重新保存后再试");
    }

    const schema = {};
    SNAPSHOT_SCHEMA_FIELDS.forEach((field) => {
        if (normalized[field] !== undefined) schema[field] = normalized[field];
    });
    const schemaBytes = new TextEncoder().encode(JSON.stringify(schema)).length;
    if (schemaBytes > MAX_SCHEMA_BYTES) {
        throw new Error("该配装内容过大，暂时无法保存为本场配装，请联系赛事运营处理");
    }

    return {
        version: 1,
        source: {
            type: "jx3box_pz",
            id,
            updated_at: normalized.updated_at,
        },
        schema,
    };
};

export const isValidPzSnapshot = (snapshot) =>
    Number(snapshot?.version) === 1 &&
    Number.isInteger(Number(snapshot?.source?.id)) &&
    Number(snapshot.source.id) > 0 &&
    Number(snapshot?.schema?.id) === Number(snapshot.source.id) &&
    snapshot?.schema?.overview &&
    typeof snapshot.schema.overview === "object";
