import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const fontPath = './tmp/NanoOldSongA-Regular.ttf';
const text = '活动介绍赛事进程擂台挑战报名参在线直播支持投票';
const outputDir = 'output';

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    console.log('开始处理字体文件...');
    console.log(`源文件: ${fontPath}`);
    console.log(`包含文字: ${text}`);

    // 使用 pyftsubset 命令（需要安装 fonttools）
    const command = `/Users/lijiawei/Library/Python/3.11/bin/pyftsubset "${fontPath}" --text="${text}" --output-file="${outputDir}/font-subset.woff2" --flavor=woff2`;

    console.log('执行命令:', command);
    execSync(command, { stdio: 'inherit' });

    console.log('字体处理完成！');
    console.log(`输出文件: ${outputDir}/font-subset.woff2`);

} catch (error) {
    console.error('处理失败:', error.message);
    console.log('\n建议安装 fonttools:');
    console.log('pip install fonttools[woff]');
    console.log('或者使用 brew install fonttools (macOS)');
}
