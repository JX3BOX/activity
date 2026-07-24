const JSON_FIELDS = ["content", "snapshot", "talent_code", "talent_pzcode"];
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
    "user_id",
    "pz_author_info",
    "created_at",
    "updated_at",
];

const clone = (value) => JSON.parse(JSON.stringify(value));

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
