/**
 * 魔盒七周年游乐园 · 打本梆梆锤 / 矿跑冲冲鸭 / 萌宠连连看 / 美人拼拼图
 *
 * 由本地静态项目（app.js + assets/music/skill-voices.js）迁移而来。
 * 静态资源统一走 CDN：https://cdn.jx3box.com/design/event/birthday/2026_7th/
 *
 * 对外仅暴露 initGames() / destroyGames()，由 birthday7.vue 在
 * mounted / beforeUnmount 生命周期中调用，保证路由切换时
 * 定时器、监听、AudioContext、RAF 粒子动画全部被清理。
 */

var CDN = "https://cdn.jx3box.com/design/event/birthday/2026_7th/";

var activeDestroy = null;

export function initGames() {
    destroyGames();
    activeDestroy = bootGames();
}

export function destroyGames() {
    if (activeDestroy) {
        try {
            activeDestroy();
        } catch (e) {
            /* ignore */
        }
        activeDestroy = null;
    }
}

function bootGames() {
  "use strict";
var MINE_SKILL_SOUNDS=["https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1000830327.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100128499.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1001305735.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100194245.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100216552.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1002668975.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1003427856.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1003873745.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1004934033.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100501864.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100600677.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/100978624.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1011320521.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1012028153.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1013227744.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1016697935.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1017134866.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1020517729.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1021935003.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1022956482.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1024620317.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1025109112.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/102613694.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/103190256.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1034823760.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1043710716.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1045058049.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1045321234.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1045484298.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1045677430.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1048275788.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1049338435.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1052076130.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1056163349.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1056704521.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/105725479.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1060215145.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/106243898.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/106480737.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1067346009.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/1067636466.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/107265851.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/10797312.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/108132885.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/109242594.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/111564578.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/112017843.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/116148010.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/116167567.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/117981220.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/117999052.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/12057818.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/121229019.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/121372562.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/122552293.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/125702609.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/127228932.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/128409036.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/128688634.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/130631848.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/131958281.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/132540809.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/132661449.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/134068831.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/13408734.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/134272354.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/134346329.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/134992712.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/135505807.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/135745402.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/135853634.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/136315920.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/137388498.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/137889500.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/138163923.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/138653210.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/141345855.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/141632987.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/141648988.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/14259521.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/144631999.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/144975986.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/14559365.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/145981087.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/146125711.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/148714860.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/148865298.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/149224748.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/151261973.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/151303576.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/152419774.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/153660884.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/156055136.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/157227.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/159113938.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/161340541.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/161436720.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/163109239.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/163929986.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/164321672.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/167869828.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/168086265.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/169319130.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/169644474.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/171633570.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/171879239.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/175431244.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/177972011.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/178067358.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/180071399.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/18073295.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/181004592.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/18437130.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/186495262.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/186804602.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/188059094.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/189311287.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/190221897.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/190765229.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/191722624.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/19188490.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/192363277.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/192432177.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/193544619.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/194524285.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/196781273.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/198699810.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/199467777.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/201562580.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/201749797.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/203109096.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/203294058.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/205576902.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/208725434.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/209352714.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/210681812.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/213078192.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/213110370.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/213473314.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/213942861.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/216851466.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/217082779.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/220346291.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/221468753.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/221636350.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/221919149.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/223855778.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/224693683.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/224736173.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/225005983.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/22651465.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/226700469.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/226723314.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/227396769.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/2274653.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/228473029.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/229799322.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/22998160.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/230010377.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/233277669.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/234241974.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/234975435.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/235665690.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/236104131.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/236935880.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/237413537.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/2374213.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/23960230.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/240928902.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/241742548.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/243960035.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/245205891.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/245253509.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/246716208.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/252025606.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/252763356.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/253166969.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/25410693.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/254483645.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/256941398.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/258628463.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/260695467.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/261973691.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/262963634.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/263418058.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/264376167.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/266815675.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/267511461.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/267630541.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/269919767.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/270497679.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/271128704.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/271178241.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/271977074.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/273702333.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/275506975.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/279159825.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/280801939.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/283717054.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/284926785.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/28701155.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/287343375.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/288017632.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/28830163.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/288971643.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/289214848.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/290159397.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/290862869.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/292289824.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/293470965.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/294240191.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/294586550.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/29564555.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/296393729.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/296668854.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/296917324.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/299229896.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/30016805.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/303913033.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/305884922.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/306583148.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/306672272.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/310130892.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/312647777.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/312897527.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/31304553.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/315572417.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/318119021.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/31832785.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/31836471.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/319058637.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/320207152.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/32205820.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/322119484.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/322462636.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/323041987.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/32358486.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/323999478.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/32405093.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/32630658.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/328928861.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/336604295.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/337850833.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/338995654.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/33903352.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/340506192.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/340892173.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/342270609.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/342434443.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/343247030.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/345969090.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/347412120.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/3482536.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/349633993.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/349988759.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/35121601.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/353721137.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/35377193.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/354618192.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/356044015.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/356900444.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/357192356.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/358925261.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/363763232.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/367701865.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/368101066.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/369499237.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/36970724.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/371372923.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/372048823.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/376833384.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/377449004.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/378554228.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/379037915.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/380559345.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/382742800.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/383438691.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/38537514.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/387358995.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/38808379.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/388744427.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/389359519.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/390809998.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/392674319.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/397101972.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/398301227.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/398995430.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/399869415.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/401503855.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/401840206.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/402927836.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/404095726.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/40533462.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/406349865.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/410049831.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/413330263.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/41362834.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/414441389.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/414765982.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/415238227.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/415407904.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/417360074.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/418339926.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/418514707.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/419223819.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/41949704.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/420354281.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/425598044.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/426736700.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/428216908.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/429162110.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/429929665.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/43019181.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/430727650.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/431325673.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/43215466.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/433371386.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/43553148.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/43673667.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/441568659.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/441923645.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/44267565.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/444082444.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/444959638.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/449342880.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/450639193.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/451464935.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/45304627.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/45472664.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/455601735.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/455851133.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/458805196.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/459265192.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/461465671.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/463223016.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/463317133.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/464153467.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/466324445.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/467196300.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/467208496.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/467228339.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/468067016.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/468212993.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/469344587.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/469981245.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/470308460.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/471123376.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/47396635.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/474183598.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/474331723.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/474522638.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/474750873.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/47842080.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/482697060.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/48443349.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/491484005.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/501121489.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/504469134.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/506546707.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/507517455.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/51270282.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/516473644.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/516657469.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/516716206.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/51726855.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/521401907.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/522664899.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/526203043.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/52688409.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/529225884.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/529706720.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/530843868.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/531511511.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/532807030.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/536572917.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/541556101.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/544282223.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/544458147.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/54653536.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/547147182.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/548304430.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/548783496.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/54914815.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/551424119.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/552553939.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/553949896.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/558617086.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/55878797.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/558815836.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/559567917.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/563715775.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/56471686.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/565380997.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/568165132.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/569079647.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/569579541.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/570635561.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/573915315.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/578537075.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/579086822.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/580883253.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/584911748.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/58748542.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/590074893.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/591814251.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/592972675.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/599403594.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/603545088.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/60595593.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/610604540.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/61393814.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/614266353.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/614936131.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/617970734.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/619957263.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/62142204.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/622525700.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/62269354.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/624752563.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/626781625.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/62973858.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/631288117.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/631681103.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/63215632.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/633609339.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/638252365.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/638813963.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/639397353.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/641180650.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/641306870.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/64183049.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/643103527.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/643745588.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/64734818.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/647800323.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/648471785.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/648478785.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/651025316.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/651416094.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/651670284.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/652379393.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/654667923.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/657879530.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/657996750.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/66034238.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/663720973.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/667509622.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/668699640.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/669996122.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/675050778.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/676715470.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/67773230.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/678228934.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/680763105.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/684174141.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/684773217.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/686383319.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/68880485.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/689164049.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/689818540.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/691173715.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/69123648.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/69458751.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/695349871.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/695515738.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/697377876.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/69800972.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/698661620.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/701284987.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/70432965.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/706923298.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/707284299.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/709533436.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/711511162.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/712132253.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/716526558.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/718558831.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/725312786.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/729056269.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/72997461.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/734553716.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/735859637.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/737165512.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/73856770.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/741835311.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/741951591.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/742492668.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/749751865.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/750275465.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/752880340.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/754293135.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/756610840.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/763250549.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/77386871.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/774007612.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/785327212.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/78642558.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/786562375.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/78804681.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/789763049.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/793524874.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/795435370.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/795554422.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/795962725.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/796924560.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/79710072.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/79862494.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/798707954.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/802646784.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/803343908.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/806456799.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/80826093.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/808941189.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/80988625.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/811042022.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/814099392.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/82265286.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/831397256.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/831605528.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/831613808.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/833613711.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/836145145.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/84045673.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/846564125.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/850951623.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/860439950.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/861938419.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/862410412.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/864951388.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/865031495.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/866782677.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/86733635.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/869471572.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/87584408.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/878465710.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/878687043.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/883729472.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/886031784.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/891628301.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/893930700.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/895455257.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/896140806.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/90202153.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/904599364.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/906713394.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/911037933.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/911233912.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/914023218.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/915577246.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/916951452.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/92058000.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/923419479.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/930973916.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/934807344.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/93484214.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/93983786.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/94013931.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/94140387.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/944535430.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/95648022.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/958073438.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/963776454.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/96425829.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/975687713.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/976911043.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/97753468.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/993995323.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/995563011.mp3","https://data.jx3box.com/audio/std/data/wwiseaudio/generatedsoundbanks/windows/base/996865031.mp3"];  var $ = function(sel, root){ return (root || document).querySelector(sel); };
  var $$ = function(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var stage = $("#stage");
  var gameStage = $("#gameStage");
  var progressFill = $("#progressFill");
  var progressText = $("#progressText");
  var footerActions = $("#footerActions");
  var rulesOverlay = $("#rulesOverlay");
  var rulesTitle = $("#rulesTitle");
  var rulesBody = $("#rulesBody");
  var rulesStart = $("#rulesStart");
  var rulesNever = $("#rulesNever");
  var rulesSuppressed = false;
  try { rulesSuppressed = localStorage.getItem("jx3_anniversary_rules_hidden") === "1"; } catch(e){}
  var resultOverlay = $("#resultOverlay");
  var resultKicker = $("#resultKicker");
  var resultTitle = $("#resultTitle");
  var resultDesc = $("#resultDesc");
  var resultStats = $("#resultStats");
  var resultBtn = $("#resultBtn");
  var toastEl = $("#toast");
  var backdrop = $("#backdrop");
  var currentGame = 1;
  var controller = null;
  var resultAction = null;
  var toastTimer = null;
  var audioCtx = null;
  var pageBgm = new Audio("" + CDN + "music/bgm.mp3");
  pageBgm.loop = true;
  pageBgm.preload = "auto";
  pageBgm.volume = .01;
  pageBgm.addEventListener("loadedmetadata", function(){ pageBgm.volume = .01; });
  pageBgm.addEventListener("playing", function(){ pageBgm.volume = .01; });
  var pageBgmStarted = false;
  function startPageBgm(){
    if(pageBgmStarted) return;
    try{
      var p=pageBgm.play();
      if(p && p.then){ p.then(function(){ pageBgmStarted=true; }, function(){}); }
      else { pageBgmStarted=true; }
    }catch(e){}
  }
  startPageBgm();
  document.addEventListener("pointerdown", startPageBgm, {once:true});
  document.addEventListener("keydown", startPageBgm, {once:true});
  document.addEventListener("touchstart", startPageBgm, {once:true, passive:true});

  var ICONS = {
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
    hint: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.3 14.4a6.2 6.2 0 1 1 7.4 0c-.8.6-1.2 1.5-1.2 2.5H9.5c0-1-.4-1.9-1.2-2.5z"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6h-4.2a5 5 0 0 0-4 2l-3.6 4.8a5 5 0 0 1-4 2H3"/><path d="M17.5 3.5L20 6l-2.5 2.5"/><path d="M17.5 15.5L20 18l-2.5 2.5"/><path d="M3 18h1.2a5 5 0 0 0 4-2l.8-1"/><path d="M20 18h-4.2a5 5 0 0 1-4-2l-.7-1"/></svg>'
  };

  function tone(freq, duration, type, volume){
    try{
      if(!audioCtx){
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if(!Ctx) return;
        audioCtx = new Ctx();
      }
      if(audioCtx.state === "suspended") audioCtx.resume();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume || 0.025, audioCtx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (duration || 0.08));
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + (duration || 0.08) + 0.02);
    }catch(e){}
  }
  function toast(message){
    toastEl.textContent = message;
    toastEl.classList.add("show");
    if(toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove("show"); }, 2100);
  }
  function setProgress(cur, total){
    var c = Math.max(0, Math.min(total, cur));
    progressText.textContent = c + "/" + total;
    progressFill.style.width = (total ? (c / total * 100) : 0) + "%";
  }
  function setActions(actions){
    footerActions.innerHTML = "";
    actions.forEach(function(a){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "action-btn" + (a.primary ? " primary" : "");
      b.innerHTML = (a.icon && ICONS[a.icon] ? ICONS[a.icon] : "") + "<span>" + a.label + "</span>";
      b.addEventListener("click", a.onClick);
      footerActions.appendChild(b);
    });
  }
  function hideResult(){
    resultOverlay.classList.remove("show");
    resultOverlay.setAttribute("aria-hidden", "true");
    resultAction = null;
  }
  function confettiBurst(){
    var layer=document.getElementById("confettiLayer");
    if(!layer) return;
    layer.innerHTML="";
    var colors=["#ff6b86","#ffd166","#66e0c2","#7fb8ff","#c79bff","#ff9f68","#fff3b0"];
    for(var i=0;i<90;i++){
      var s=document.createElement("i");
      s.className="confetti-piece";
      s.style.left=(Math.random()*100)+"%";
      s.style.background=colors[i%colors.length];
      s.style.animationDelay=(Math.random()*.35)+"s";
      s.style.animationDuration=(1.8+Math.random()*1.5)+"s";
      s.style.setProperty("--x",(Math.random()*280-140)+"px");
      s.style.setProperty("--r",(Math.random()*1080-540)+"deg");
      s.style.width=(5+Math.random()*7)+"px";
      s.style.height=(10+Math.random()*16)+"px";
      layer.appendChild(s);
    }
    setTimeout(function(){ if(layer) layer.innerHTML=""; }, 3600);
  }
  function showResult(o){
    toastEl.classList.remove("show");
    resultKicker.textContent = o.kicker || "魔盒七周年";
    resultTitle.textContent = o.title;
    resultDesc.textContent = o.desc || "";
    resultStats.innerHTML = o.stats || "";
    resultStats.style.display = o.stats ? "flex" : "none";
    resultBtn.textContent = o.button || "再玩一次";
    resultAction = o.onAction || null;
    resultOverlay.classList.add("show");
    resultOverlay.setAttribute("aria-hidden", "false");
    tone(o.fail ? 220 : 720, .1, "sine", .02);
    if(!o.fail) confettiBurst();
    setTimeout(function(){ resultBtn.focus(); }, 80);
    if(!o.fail){
      var wonGame = currentGame;
      setTimeout(function(){
        if(!claimedRewards[wonGame]) openClaim([wonGame]);
      }, 650);
    }
  }
  resultBtn.addEventListener("click", function(){
    var action = resultAction;
    hideResult();
    if(action) action();
  });
  var mobileInitialized = false;
  function isMobileViewport(){
    var vals=[];
    if(window.visualViewport && window.visualViewport.width) vals.push(window.visualViewport.width);
    if(window.screen && window.screen.width) vals.push(window.screen.width);
    if(window.outerWidth) vals.push(window.outerWidth);
    if(window.innerWidth) vals.push(window.innerWidth);
    return Math.min.apply(null, vals) <= 1024;
  }
  function applyResponsive(){
    var wasMobile=document.body.classList.contains("is-mobile");
    var isMobile=isMobileViewport();
    document.body.classList.toggle("is-mobile", isMobile);
    if(!mobileInitialized){ mobileInitialized=true; return; }
    if(wasMobile!==isMobile && typeof currentGame !== "undefined" && currentGame){
      setTimeout(function(){ renderRewards(); switchGame(currentGame, true, true); },0);
    }
  }
  function fitStage(){
    applyResponsive();
    if(document.body.classList.contains("is-mobile")){
      stage.style.left = "0";
      stage.style.transform = "none";
      stage.style.transformOrigin = "top left";
      return;
    }
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 965);
    stage.style.left = "0";
    stage.style.transformOrigin = "left center";
    stage.style.transform = "translate(0,-50%) scale(" + s + ")";
  }
  window.addEventListener("resize", fitStage);
  window.addEventListener("orientationchange", fitStage);
  if(window.visualViewport) window.visualViewport.addEventListener("resize", fitStage);
  var applyResponsiveTimer = setInterval(applyResponsive, 700);

  var BG = "" + CDN + "ui/bg.jpg";
  var titleImgs = $$(".title-img");
  var GAME_NAMES = {1:"打本梆梆锤",2:"矿跑冲冲鸭",3:"萌宠连连看",4:"美人拼拼图"};
  var RULES = {
    1:"玩家用锤头击打从洞中窜出的NPC。成功击打反派NPC一次+1分，成功击打策划一次+2分，误伤正派NPC一次-3分。NPC未出来时提前击打空洞口扣1分。总分达到10分即获胜。",
    2:"玩家拖动头像沿唯一主路前进，依次经过5个据点，并到主路外收集3处散落物资。长按Shift或双指按住可以消耗气力加速，松开后开始恢复气力值。地图上还有3队绿林自由游荡，靠近玩家会发现并加速追来，只有碰到绿林才会进入战斗。不要求消灭绿林，集齐3处物资、经过5个据点并抵达终点即可通关。",
    3:"玩家依次点击两个相同的门派宠物方块进行配对完成收集。两方块之间的连线转弯不超过2次（可直线、一折、两折），连线只能经过空格，不能穿过其他方块。收集全部宠物即获胜。",
    4:"玩家需将右侧打散的“兵家图谱”拼图拖动至左侧拼成完整图案。每块拼图有唯一正确位置，通过图案、颜色和边缘形状判断。拼图之间必须形状吻合、图案连续，不能重叠或强行拼接。所有拼图正确拼合、无缺失即获胜。"
  };
  var sideItems = $$(".side-item");
  var rewardEls = $$(".reward-claim");
  var claimedRewards = {};
  var pendingRewards = [];
  var claimOverlay = $("#claimOverlay");
  var claimTitle = $("#claimTitle");
  var claimDesc = $("#claimDesc");
  var claimConfirm = $("#claimConfirm");
  var closeOverlay = $("#closeOverlay");
  [rulesOverlay, resultOverlay, claimOverlay, closeOverlay].forEach(function(el){
    if(el && el.parentNode !== document.body) document.body.appendChild(el);
  });
  var closeCancel = $("#closeCancel");
  var closeConfirm = $("#closeConfirm");
  var ruleText = $("#ruleText");
  var mobileGameTitle = $("#mobileGameTitle");
  var MINE_MAPS = [
    "" + CDN + "map/map_maweiyi.jpg",
    "" + CDN + "map/map_longmenhuangmo.jpg",
    "" + CDN + "map/map_luodao.jpg",
    "" + CDN + "map/map_balingxian.jpg"
  ];
  var lastMineMap = null;
  function pickMineMap(){
    if(MINE_MAPS.length === 1) return MINE_MAPS[0];
    var pool = MINE_MAPS.filter(function(src){ return src !== lastMineMap; });
    var chosen = pool[Math.floor(Math.random() * pool.length)] || MINE_MAPS[0];
    lastMineMap = chosen;
    return chosen;
  }
  var mobileSwitchBtn = $("#mobileSwitchBtn");
  var pendingGameInitial = false;
  function buildGame(){
    var n = currentGame;
    var initial = pendingGameInitial;
    var factory = {1:createBonk,2:createMine,3:createLink,4:createPuzzle}[n];
    controller = factory();
    if(!initial){
      // 原版写入 "#gameN" hash 会破坏本仓库的 vue-router hash 路由（#/7），
      // 改用查询参数 ?game=N 记录当前游戏，不影响路由。
      try{
        var params = new URLSearchParams(location.search);
        params.set("game", String(n));
        history.replaceState(null, "", location.pathname + "?" + params.toString() + location.hash);
      }catch(e){}
    }
    document.title = GAME_NAMES[n] + " · 魔盒七周年游乐园";
  }
  function showRulesFor(n, initial){
    pendingGameInitial = initial;
    rulesTitle.textContent = GAME_NAMES[n];
    rulesBody.textContent = RULES[n];
    rulesOverlay.classList.add("show");
    rulesOverlay.setAttribute("aria-hidden","false");
    document.body.classList.add("rules-open");
    setTimeout(function(){ if(rulesStart) rulesStart.focus(); }, 80);
  }
  function closeRules(){
    rulesOverlay.classList.remove("show");
    rulesOverlay.setAttribute("aria-hidden","true");
    document.body.classList.remove("rules-open");
    buildGame();
  }
  if(rulesStart) rulesStart.addEventListener("click", closeRules);
  if(rulesNever) rulesNever.addEventListener("click", function(){
    rulesSuppressed = true;
    try { localStorage.setItem("jx3_anniversary_rules_hidden","1"); } catch(e){}
    closeRules();
  });
  function switchGame(n, initial, skipRules){
    if(controller && controller.stop) controller.stop();
    currentGame = n;
    pendingGameInitial = initial;
    hideResult();
    titleImgs.forEach(function(el){ el.classList.toggle("active", Number(el.dataset.title) === n); });
    sideItems.forEach(function(el){ el.classList.toggle("active", Number(el.dataset.game) === n); });
    if(ruleText) ruleText.textContent = RULES[n];
    if(mobileGameTitle) mobileGameTitle.textContent = GAME_NAMES[n];
    document.body.classList.remove("mobile-menu-open");
    backdrop.style.backgroundImage = 'url("' + BG + '")';
    gameStage.innerHTML = "";
    gameStage.classList.remove("mobile-puzzle-stage");
    gameStage.classList.remove("mobile-link-stage");
    gameStage.classList.remove("mobile-bonk-stage");
    gameStage.classList.remove("mobile-mine-stage");
    footerActions.innerHTML = "";
    progressFill.style.width = "0%";
    progressText.textContent = "0/10";
    if(skipRules || rulesSuppressed){ closeRules(); } else { showRulesFor(n, initial); }
  }
  function restartCurrent(){ switchGame(currentGame, true, true); }
  sideItems.forEach(function(btn){
    btn.addEventListener("click", function(){
      switchGame(Number(btn.dataset.game));
      document.body.classList.remove("mobile-menu-open");
    });
  });
  var mobileMenuBackdrop = $("#mobileMenuBackdrop");
  if(mobileMenuBackdrop){
    mobileMenuBackdrop.addEventListener("click", function(){
      document.body.classList.remove("mobile-menu-open");
    });
  }
  function onDocClickCapture(e){
    if(!document.body.classList.contains("mobile-menu-open")) return;
    var sidebar=document.querySelector(".sidebar");
    if(sidebar && sidebar.contains(e.target)) return;
    if(mobileSwitchBtn && mobileSwitchBtn.contains(e.target)) return;
    document.body.classList.remove("mobile-menu-open");
  }
  document.addEventListener("click", onDocClickCapture, true);
  if(mobileSwitchBtn){
    mobileSwitchBtn.addEventListener("click", function(){
      document.body.classList.toggle("mobile-menu-open");
    });
  }
  var mobileBackBtn = $("#mobileBackBtn");
  if(mobileBackBtn){
    mobileBackBtn.addEventListener("click", function(){
      var cb = $("#closeBtn");
      if(cb) cb.click();
    });
  }
  function renderRewards(){
    rewardEls.forEach(function(el){
      var n = Number(el.dataset.reward);
      var b = el.querySelector("b");
      var mobile = isMobileViewport();
      var claimLabel = claimedRewards[n] ? "已领取" : (mobile ? "领取礼物" : "领取");
      if(b) b.textContent = claimLabel;
      el.classList.toggle("claimed", !!claimedRewards[n]);
      el.setAttribute("aria-label", claimLabel + "第" + n + "项七周年奖励");
    });
  }
  function openClaim(list){
    pendingRewards = list.slice();
    if(!pendingRewards.length){ toast("这些奖励已经领取过啦"); return; }
    var labels = {1:"7周年勋章",2:"7周年称号",3:"7周年头像框",4:"7周年主题装扮"};
    if(pendingRewards.length === 1){
      claimTitle.textContent = "奖励领取成功";
      claimDesc.textContent = "「" + labels[pendingRewards[0]] + "」已放入你的魔盒账号，收下吧～";
    }else{
      claimTitle.textContent = "奖励全部领取成功";
      claimDesc.textContent = "已领取 " + pendingRewards.length + " 项七周年奖励：" + pendingRewards.map(function(n){return labels[n];}).join("、") + "。";
    }
    claimOverlay.classList.add("show");
    claimOverlay.setAttribute("aria-hidden","false");
    setTimeout(function(){ claimConfirm.focus(); }, 80);
    tone(680,.08,"sine",.02);
  }
  function closeClaim(){
    claimOverlay.classList.remove("show");
    claimOverlay.setAttribute("aria-hidden","true");
  }
  claimConfirm.addEventListener("click", function(){
    pendingRewards.forEach(function(n){ claimedRewards[n] = true; });
    pendingRewards = [];
    renderRewards();
    closeClaim();
    toast("奖励已收下，记得在游戏里完成挑战哦～");
    tone(820,.08,"sine",.02);
  });
  rewardEls.forEach(function(el){
    var b = el.querySelector("b");
    function claimSingle(event){
      event.preventDefault();
      event.stopPropagation();
      var n = Number(el.dataset.reward);
      if(claimedRewards[n]){ toast("这项奖励已经领取过啦"); return; }
      openClaim([n]);
    }
    b.addEventListener("click", claimSingle);
    b.addEventListener("keydown", function(event){
      if(event.key === "Enter" || event.key === " "){ claimSingle(event); }
    });
    el.addEventListener("click", function(event){
      if(event.target !== b){ event.preventDefault(); event.stopPropagation(); }
    });
  });
  $("#claimBtn").addEventListener("click", function(){
    var unclaimed = [1,2,3,4].filter(function(n){ return !claimedRewards[n]; });
    if(!unclaimed.length){ toast("四款游戏的奖励已经全部领取啦"); return; }
    openClaim(unclaimed);
  });
  renderRewards();
  $("#closeBtn").addEventListener("click", function(){
    closeOverlay.classList.add("show");
    closeOverlay.setAttribute("aria-hidden","false");
    setTimeout(function(){ closeCancel.focus(); }, 80);
  });
  closeCancel.addEventListener("click", function(){
    closeOverlay.classList.remove("show");
    closeOverlay.setAttribute("aria-hidden","true");
  });
  closeConfirm.addEventListener("click", function(){
    [1,2,3,4].forEach(function(n){ claimedRewards[n] = true; });
    renderRewards();
    window.location.href = "https://www.jx3box.com";
  });

  // Protect the mobile playfield from accidental page swipes while keeping
  // taps/drags inside the games intact.
  function onDocTouchMove(e){
    var stage = e.target && e.target.closest ? e.target.closest(".game-stage") : null;
    if(stage && document.body.classList.contains("is-mobile") && !document.body.classList.contains("mobile-menu-open")){
      e.preventDefault();
    }
  }
  document.addEventListener("touchmove", onDocTouchMove, {passive:false});

  /* ============================================================
     game 1 · 打本梆梆锤
  ============================================================ */
  // CDN 上可用的 NPC 素材是确定的（villain 1-3 / friendly 1 / planner 1），
  // 不再像本地版那样探测 270 个候选地址，直接写死静态池，避免大量 404。
  var npcAssetPools = {
    villain:[
      CDN + "npc/villain-1.webp",
      CDN + "npc/villain-2.webp",
      CDN + "npc/villain-3.webp"
    ],
    friendly:[CDN + "npc/friendly-1.webp"],
    planner:[CDN + "npc/planner-1.webp"]
  };
  function pickNpc(kind){
    var pool=npcAssetPools[kind];
    if(pool && pool.length) return pool[Math.floor(Math.random()*pool.length)];
    return CDN + "npc/" + kind + "-1.webp";
  }
  function createBonk(){
    if(isMobileViewport()) gameStage.classList.add("mobile-bonk-stage");
    var grid = document.createElement("div");
    grid.className = "bonk-grid";
    gameStage.appendChild(grid);
    var types = {
      villain:{label:"反派",points:1,cls:"villain"},
      friendly:{label:"正派",points:-3,cls:"friendly"},
      planner:{label:"策划",points:2,cls:"planner"}
    };
    var cells = [];
    var state = "playing";
    var score = 0;
    var timers = new Set();
    var spawnTimer = null;
    var stopped = false;
    function later(fn, ms){ var id = setTimeout(function(){ timers.delete(id); if(!stopped) fn(); }, ms); timers.add(id); return id; }
    function clearTimers(){ timers.forEach(clearTimeout); timers.clear(); if(spawnTimer){clearTimeout(spawnTimer);spawnTimer=null;} }
    function setBonkScore(cur){
      progressText.textContent = cur + "/10";
      progressFill.style.width = (Math.max(0, Math.min(1, cur/10)) * 100) + "%";
    }
    for(var i=0;i<12;i++){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "bonk-cell";
      b.innerHTML = '<span class="bonk-meter"><i></i></span><img class="bonk-npc" alt=""><img class="bonk-cover" src="" + CDN + "cover.svg" alt=""><span class="bonk-hit-flash"></span><span class="bonk-tag"></span>';
      var data = {el:b, status:"idle", type:null, timer:null, meter:b.querySelector(".bonk-meter"), tag:b.querySelector(".bonk-tag"), npc:b.querySelector(".bonk-npc")};
      b.addEventListener("click", function(d){ return function(){ clickCell(d); }; }(data));
      grid.appendChild(b);
      cells.push(data);
    }
    function randomType(){
      var r = Math.random();
      if(r < .44) return "villain";
      if(r < .75) return "friendly";
      return "planner";
    }
    function startCharge(cell){
      if(state !== "playing" || cell.status !== "idle" || score >= 10) return;
      var key = randomType();
      var type = types[key];
      cell.status = "charging";
      cell.type = key;
      cell.el.className = "bonk-cell charging";
      cell.npc.src = pickNpc(key);
      cell.tag.className = "bonk-tag " + type.cls;
      cell.tag.textContent = type.label;
      cell.el.setAttribute("aria-label", "洞口正在读条，" + type.label + "NPC 正在探头");
      cell.timer = later(function(){ popCell(cell); }, 500);
      tone(300,.04,"sine",.012);
    }
    function popCell(cell){
      if(state !== "playing" || cell.status !== "charging") return;
      var type = types[cell.type];
      cell.status = "up";
      cell.el.className = "bonk-cell active " + type.cls;
      cell.tag.className = "bonk-tag " + type.cls;
      cell.tag.textContent = type.label;
      cell.el.setAttribute("aria-label", type.label + "NPC，点击击打");
      cell.timer = later(function(){ escapeCell(cell); }, 1000);
      tone(cell.type === "planner" ? 640 : 420, .07, "sine", .02);
    }
    function escapeCell(cell){
      if(cell.status !== "up") return;
      cell.status = "escaping";
      cell.el.className = "bonk-cell escaping " + types[cell.type].cls;
      cell.tag.className = "bonk-tag";
      cell.tag.textContent = "";
      cell.el.setAttribute("aria-label", "NPC 正在缩回洞里");
      later(function(){
        if(cell.status !== "escaping") return;
        cell.status = "idle";
        cell.el.className = "bonk-cell";
        cell.npc.removeAttribute("src");
        cell.el.setAttribute("aria-label", "空洞口");
      }, 360);
    }
    function penalizeEarly(cell, message){
      score -= 1;
      setBonkScore(score);
      var f = document.createElement("span");
      f.className = "bonk-float minus";
      f.textContent = "-1";
      f.style.left = "50%";
      f.style.top = "38%";
      cell.el.appendChild(f);
      setTimeout(function(){ if(f.parentNode) f.remove(); }, 900);
      toast(message || "打早了！扣 1 分");
      tone(170,.12,"triangle",.03);
    }
    function cancelCharge(cell){
      if(cell.status !== "charging") return;
      if(cell.timer) clearTimeout(cell.timer);
      cell.status = "idle";
      cell.el.className = "bonk-cell canceled";
      cell.tag.className = "bonk-tag";
      cell.tag.textContent = "";
      penalizeEarly(cell, "太早啦！NPC 还没出来，扣 1 分");
      tone(180,.12,"triangle",.025);
      later(function(){
        if(cell.status === "idle"){
          cell.el.className = "bonk-cell";
          cell.npc.removeAttribute("src");
          cell.el.setAttribute("aria-label", "空洞口");
        }
      }, 360);
    }
    function clickCell(cell){
      if(state !== "playing") return;
      if(cell.status === "charging"){ cancelCharge(cell); return; }
      if(cell.status === "idle"){ penalizeEarly(cell, "空洞口还没有 NPC，扣 1 分"); return; }
      if(cell.status !== "up") return;
      var type = types[cell.type];
      if(cell.timer) clearTimeout(cell.timer);
      cell.status = "hit";
      score += type.points;
      setBonkScore(score);
      cell.el.classList.add("hit");
      cell.tag.textContent = (type.points > 0 ? "+" : "") + type.points;
      var f = document.createElement("span");
      f.className = "bonk-float " + (type.points > 0 ? "plus" : "minus");
      f.textContent = (type.points > 0 ? "+" : "") + type.points;
      f.style.left = "50%";
      f.style.top = "38%";
      cell.el.appendChild(f);
      setTimeout(function(){ if(f.parentNode) f.remove(); }, 900);
      tone(type.points > 0 ? (cell.type === "planner" ? 900 : 620) : 160, .09, "sine", .03);
      if(score >= 10){
        state = "won";
        clearTimers();
        setTimeout(function(){
          showResult({
            kicker:"Dungeon Clear",
            title:"梆梆通关！",
            desc:"你拿到了 " + score + " 分，成功从试炼场毕业。",
            stats:'<div><span>SCORE</span><strong>' + score + '</strong></div><div><span>TARGET</span><strong>10</strong></div>',
            button:"再敲一次",
            onAction:restartCurrent
          });
        }, 520);
        return;
      }
      later(function(){
        if(cell.status === "hit"){
          cell.status = "idle";
          cell.el.className = "bonk-cell";
          cell.npc.removeAttribute("src");
          cell.tag.className = "bonk-tag";
          cell.tag.textContent = "";
          cell.el.setAttribute("aria-label", "空洞口");
        }
      }, 720);
    }
    function scheduleSpawn(delay){
      if(spawnTimer) clearTimeout(spawnTimer);
      spawnTimer = setTimeout(function(){
        if(state !== "playing") return;
        var active = cells.filter(function(c){ return c.status === "charging" || c.status === "up"; }).length;
        var idle = cells.filter(function(c){ return c.status === "idle"; });
        if(active < 3 && idle.length){
          startCharge(idle[Math.floor(Math.random()*idle.length)]);
        }
        scheduleSpawn(650);
      }, delay);
    }
    function reset(){
      state = "playing";
      score = 0;
      setBonkScore(0);
      clearTimers();
      cells.forEach(function(c){
        c.status = "idle";
        c.el.className = "bonk-cell";
        c.npc.removeAttribute("src");
        c.tag.className = "bonk-tag";
        c.tag.textContent = "";
        c.el.setAttribute("aria-label", "空洞口");
      });
      setActions([{label:"重新开始", icon:"reset", onClick:reset}]);
      scheduleSpawn(500);
    }
    reset();
    return {stop:function(){ stopped = true; state = "stopped"; clearTimers(); }};
  }

  /* ============================================================
     game 2 · 矿跑冲冲鸭
  ============================================================ */
  function createMine(){
    var wrap = document.createElement("div");
    wrap.className = "map-game";
    wrap.innerHTML =
      '<div class="map-canvas">' +
        '<svg class="route-svg" viewBox="0 0 880 570" aria-hidden="true">' +
          '<path class="route-outer" id="mineOuter"/>' +
          '<path class="route-base" id="mineBase"/>' +
          '<path class="route-dash" id="mineDash"/>' +
          '<path class="route-trail" id="mineTrail"/>' +
          '<g id="mineCps"></g>' +
          '<g id="mineSupplies"></g>' +
          '<g id="mineTeamFx"></g>' +
        '</svg>' +
        '<div class="mine-teams" id="mineTeams"></div>' +
        '<div class="mine-hud" id="mineHud">' +
          '<span id="mineCpHud">据点 0/5</span>' +
          '<span id="mineSupplyHud">物资 0/3</span>' +
        '</div>' +
        '<div class="mine-flash" id="mineFlash"></div>' +
        '<div class="dash-hint">WASD / 摇杆移动 · Shift 加速</div>' +
        '<div class="goal-warning" id="mineGoalWarning" aria-hidden="true"><div class="goal-warning-card"><span class="gw-kicker">商路未通</span><h3>本次任务尚未完成，商路尚不通畅</h3><p id="mineGoalMissing"></p><button type="button" id="mineGoalContinue">继续跑商</button></div></div>' +
        '<button class="runner" id="mineRunner" type="button" aria-label="拖动鸭鸭跑商，途中收集物资并躲避绿林"><img src="" + CDN + "player-avatar.jpg" alt=""><svg class="boost-ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="boost-track" cx="50" cy="50" r="46"/><circle class="boost-progress" cx="50" cy="50" r="46"/></svg></button>' +
        '<div class="mine-touch-controls" id="mineTouchControls"><div class="mine-stick" id="mineStick"><i class="mine-stick-knob" id="mineStickKnob"></i></div><button class="mine-boost-btn" id="mineBoostBtn" type="button" aria-label="加速" title="加速"><svg class="mine-boost-icon" viewBox="0 0 1024 1024" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M528.032 226.7648l0.0832-0.0768c105.5232-105.536 252.2688-143.0656 382.72-111.2 31.872 130.4576-5.664 277.1968-111.1936 382.7264-1.4592 1.4592-2.9248 2.9056-4.4032 4.3392l-58.0352 58.0416 47.9808 84.768a76.8 76.8 0 0 1-3.7888 81.6832l-126.272 181.5488c-24.2112 34.816-72.0768 43.4112-106.8992 19.2a76.8 76.8 0 0 1-3.712-2.7584l0.3264-0.4096a41.6192 41.6192 0 0 1-14.8544-54.4768 34.624 34.624 0 0 0-0.0896-0.0384c24.9984-42.6752 28.0128-98.496 11.0464-155.456-61.984 13.824-129.4848-3.392-177.7152-51.616-48.2176-48.2176-65.4272-115.6992-51.6288-177.6704-56.928-16.9472-112.7232-13.9264-155.3792 11.0592a35.2384 35.2384 0 0 0-0.0384-0.0896 41.6192 41.6192 0 0 1-54.4768-14.848l-0.3584 0.2816c-23.4112-30.1312-21.28-73.6832 6.4-101.3632a76.8 76.8 0 0 1 10.4576-8.7488l181.6512-126.336a76.8 76.8 0 0 1 81.5232-3.8784l84.4032 47.5136 60.3648-60.3648c0.6208-0.6272 1.2544-1.2352 1.888-1.8304z m-261.504 378.8608c17.8752 45.9968 37.2864 79.4624 58.2272 100.4032 20.512 20.512 52.096 38.6112 94.7584 54.2912a19.2 19.2 0 0 1 4.896 33.3824l-72.8576 54.6368a19.2 19.2 0 0 1-30.1888-19.8336l3.1808-13.2736a19.2 19.2 0 0 0-27.8784-21.3248l-64.2624 35.1232a19.2 19.2 0 0 1-26.0544-26.048l37.4784-68.5824a19.2 19.2 0 0 0-19.5648-28.2176l-32.3264 4.6272a19.2 19.2 0 0 1-18.08-30.528l59.4112-79.2192a19.2 19.2 0 0 1 33.2544 4.5632zM621.2032 405.12c29.9904 29.9968 78.6176 29.9968 108.608 0 29.9968-29.984 29.9968-78.6112 0-108.608-29.9904-29.9904-78.6176-29.9904-108.608 0-29.9904 29.9968-29.9904 78.624 0 108.608z"/></svg></button></div>' +
        '<div class="ambush-layer" id="mineAmbush"><div class="ambush-card" id="mineAmbushCard"><span class="ambush-kicker">Robbery!</span><h3 id="mineAmbushTitle">遭遇绿林！</h3><p id="mineAmbushDesc">5 秒内击退这队绿林，每名需要命中 2 次。</p><div class="ambush-bandits" id="mineBandits"></div><div class="ambush-time"><span>剩余</span><div class="bar"><i id="mineTimeBar"></i></div><strong id="mineTime">5.0s</strong></div></div></div>' +
      '</div>';
    gameStage.appendChild(wrap);
    var mapCanvas=wrap.querySelector(".map-canvas");
    if(mapCanvas) mapCanvas.style.backgroundImage='url("'+pickMineMap()+'")';
    var isMobileMine=isMobileViewport();
    var mineSvg=wrap.querySelector(".route-svg");
    if(isMobileMine){
      gameStage.classList.add("mobile-mine-stage");
      mineSvg.setAttribute("viewBox","0 0 560 880");
    }
    var outer=wrap.querySelector("#mineOuter"), basePath=wrap.querySelector("#mineBase");
    var dashPath=wrap.querySelector("#mineDash"), trail=wrap.querySelector("#mineTrail");
    var cpsGroup=wrap.querySelector("#mineCps"), supplyGroup=wrap.querySelector("#mineSupplies"), teamFx=wrap.querySelector("#mineTeamFx"), teamGroup=wrap.querySelector("#mineTeams");
    var cpHud=wrap.querySelector("#mineCpHud"), supplyHud=wrap.querySelector("#mineSupplyHud");
    var flashEl=wrap.querySelector("#mineFlash");
    var boostProgress=wrap.querySelector(".boost-progress");
    var boostCirc=2*Math.PI*46;
    function updateBoostRing(){
      var p=boostEnergy;
      boostProgress.style.strokeDasharray=String(boostCirc);
      boostProgress.style.strokeDashoffset=String(boostCirc*(1-p));
      runner.classList.toggle("boost-gold", boostHeld);
    }
    var goalWarning=wrap.querySelector("#mineGoalWarning"), goalMissing=wrap.querySelector("#mineGoalMissing"), goalContinue=wrap.querySelector("#mineGoalContinue");
    var runner=wrap.querySelector("#mineRunner"), ambush=wrap.querySelector("#mineAmbush"), ambushCard=wrap.querySelector("#mineAmbushCard");
    var ambushTitle=wrap.querySelector("#mineAmbushTitle"), ambushDesc=wrap.querySelector("#mineAmbushDesc");
    var banditsEl=wrap.querySelector("#mineBandits"), timeEl=wrap.querySelector("#mineTime"), timeBar=wrap.querySelector("#mineTimeBar");
    var stick=wrap.querySelector("#mineStick"), stickKnob=wrap.querySelector("#mineStickKnob"), boostBtn=wrap.querySelector("#mineBoostBtn");
    ambush.addEventListener("touchmove", function(e){ if(state==="ambush") e.preventDefault(); }, {passive:false});
    var SVGW=isMobileMine?560:880, SVGH=isMobileMine?880:570;
    var pathLength=0, pathEl=basePath, endPoint={x:0,y:0};
    var checkpoints=[], supplies=[], teams=[];
    var reached=0, supplyGot=0, teamsDown=0;
    var state="playing", dragging=false, activeTeam=null;
    var facing=0;
    var moveTarget=null, playerSpeed=70.5, lastPlayerTick=0, playerRAF=null;
    var boostEnergy=1, boostHeld=false, boostActive=false, boostKey=false, boostButtonHeld=false, boostGhostAt=0, activePointers=new Set();
    var wasdKeys={w:false,a:false,s:false,d:false};
    var boostSfx=new Audio("" + CDN + "music/go.wav"); boostSfx.loop=true; boostSfx.preload="auto"; boostSfx.volume=.08;
    var foundSfx=new Audio("" + CDN + "music/found.wav"); foundSfx.preload="auto"; foundSfx.volume=.08;
    var boostAudioOn=false;
    function playBoostAudio(){
      if(boostAudioOn) return;
      boostAudioOn=true;
      try{ var p=boostSfx.play(); if(p && p.catch) p.catch(function(){ boostAudioOn=false; }); }catch(e){ boostAudioOn=false; }
    }
    function pauseBoostAudio(){
      if(!boostAudioOn) return;
      boostAudioOn=false;
      try{ boostSfx.pause(); }catch(e){}
    }
    function playFoundAudio(){
      try{ foundSfx.currentTime=0; var p=foundSfx.play(); if(p && p.catch) p.catch(function(){}); }catch(e){}
    }
    var skillAudios=[];
    var lastSkillSound="";
    var skillAudioGraph=null;
    function getSkillAudioGraph(){
      if(skillAudioGraph){
        if(skillAudioGraph.ctx.state==="suspended") skillAudioGraph.ctx.resume().catch(function(){});
        return skillAudioGraph;
      }
      var Ctx=window.AudioContext||window.webkitAudioContext;
      if(!Ctx) return null;
      try{
        var ctx=new Ctx();
        var gain=ctx.createGain();
        gain.gain.value=.012;
        gain.connect(ctx.destination);
        skillAudioGraph={ctx:ctx,gain:gain};
        if(ctx.state==="suspended") ctx.resume().catch(function(){});
        return skillAudioGraph;
      }catch(e){ return null; }
    }
    function playSkillSound(){
      var list=window.MINE_SKILL_SOUNDS || [];
      if(!list.length) return;
      var pick=list[Math.floor(Math.random()*list.length)];
      if(list.length>1 && pick===lastSkillSound) pick=list[(list.indexOf(pick)+1+Math.floor(Math.random()*(list.length-1)))%list.length];
      lastSkillSound=pick;
      var a=new Audio();
      a.crossOrigin="anonymous";
      a.preload="auto";
      a.src=pick;
      a.volume=1;
      skillAudios.push(a);
      var graph=getSkillAudioGraph();
      var source=null;
      if(graph){
        try{
          source=graph.ctx.createMediaElementSource(a);
          source.connect(graph.gain);
        }catch(e){ a.volume=.012; source=null; }
      }else{
        a.volume=.012;
      }
      function cleanup(){
        if(source){ try{ source.disconnect(); }catch(e){} }
        var i=skillAudios.indexOf(a);
        if(i>=0) skillAudios.splice(i,1);
      }
      a.addEventListener("ended",cleanup);
      a.addEventListener("error",cleanup);
      try{
        var p=a.play();
        if(p && p.catch) p.catch(function(){ cleanup(); });
      }catch(e){ cleanup(); }
    }
    var stickPointer=null, stickVec={x:0,y:0};
    var player={x:70,y:300};
    var maxPathT=0, riskCooldown=0, teamCooldown=0, offroadWarned=false, goalZone=false;
    var ambushTimer=null, ambushEndsAt=0, targets=[], defeated=0;
    var riskTimer=null, teamTimer=null;
    function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
    function smoothPath(pts){
      var d="M "+pts[0].x.toFixed(1)+" "+pts[0].y.toFixed(1);
      for(var i=0;i<pts.length-1;i++){
        var p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
        var c1x=clamp(p1.x+(p2.x-p0.x)/6,26,SVGW-26),c1y=clamp(p1.y+(p2.y-p0.y)/6,26,SVGH-26);
        var c2x=clamp(p2.x-(p3.x-p1.x)/6,26,SVGW-26),c2y=clamp(p2.y-(p3.y-p1.y)/6,26,SVGH-26);
        d+=" C "+c1x.toFixed(1)+" "+c1y.toFixed(1)+", "+c2x.toFixed(1)+" "+c2y.toFixed(1)+", "+p2.x.toFixed(1)+" "+p2.y.toFixed(1);
      }
      return d;
    }
    function nearestPath(x,y){
      var best={t:0,dist:Infinity,pt:{x:0,y:0}};
      for(var i=0;i<=180;i++){
        var p=i/180, pt=pathEl.getPointAtLength(pathLength*p);
        var dx=pt.x-x,dy=pt.y-y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<best.dist) best={t:p,dist:d,pt:pt};
      }
      return best;
    }
    function trailLimit(){
      for(var i=0;i<checkpoints.length;i++){
        if(!checkpoints[i].reached) return Math.max(0, checkpoints[i].t-.003);
      }
      return 1;
    }
    function setTrail(t){
      var shown=Math.min(maxPathT, trailLimit());
      trail.style.strokeDashoffset=String(pathLength*(1-shown));
    }
    function updateHud(){
      cpHud.textContent="据点 "+reached+"/5";
      supplyHud.textContent="物资 "+supplyGot+"/3";
      setProgressBar(reached,5);
    }
    function popText(x,y,text,cls){
      var el=document.createElement("div"); el.className="pickup-pop "+(cls||"");
      el.textContent=text; el.style.left=(x/SVGW*100)+"%"; el.style.top=(y/SVGH*100)+"%";
      wrap.querySelector(".map-canvas").appendChild(el);
      setTimeout(function(){ if(el.parentNode) el.remove(); },850);
    }
    function burst(x,y,color){
      for(var i=0;i<10;i++){
        var s=document.createElement("i"); s.className="spark";
        var a=Math.random()*Math.PI*2, d=18+Math.random()*38;
        s.style.left=(x/SVGW*100)+"%"; s.style.top=(y/SVGH*100)+"%";
        s.style.setProperty("--dx",(Math.cos(a)*d).toFixed(1)+"px");
        s.style.setProperty("--dy",(Math.sin(a)*d).toFixed(1)+"px");
        s.style.background=color||"#ffd36e";
        wrap.querySelector(".map-canvas").appendChild(s);
        (function(el){setTimeout(function(){if(el.parentNode)el.remove();},620);})(s);
      }
    }
    function shakeMap(){
      wrap.classList.remove("map-shake"); void wrap.offsetWidth; wrap.classList.add("map-shake");
      setTimeout(function(){ wrap.classList.remove("map-shake"); },320);
    }
    function celebrate(x,y,text,color){
      updateHud();
      popText(x,y,text,"gold");
      burst(x,y,color||"#ffd36e"); shakeMap(); flashEl.classList.remove("on"); void flashEl.offsetWidth; flashEl.classList.add("on");
      tone(820,.07,"sine",.03);
    }
    function afterimage(x,y){
      var g=document.createElement("div"); g.className="runner-ghost";
      g.style.left=(x/SVGW*100)+"%"; g.style.top=(y/SVGH*100)+"%";
      g.innerHTML='<img src="" + CDN + "player-avatar.jpg" alt="">';
      wrap.querySelector(".map-canvas").appendChild(g);
      setTimeout(function(){ if(g.parentNode) g.remove(); },300);
    }
    function pointSvg(clientX,clientY){
      var r=wrap.getBoundingClientRect();
      return {x:clamp((clientX-r.left)/r.width*SVGW,18,SVGW-18),y:clamp((clientY-r.top)/r.height*SVGH,20,SVGH-20)};
    }
    function setPlayer(x,y){
      var ox=player.x, oy=player.y;
      player.x=clamp(x,18,SVGW-18); player.y=clamp(y,20,SVGH-20);
      var moved=Math.hypot(player.x-ox,player.y-oy);
      if(moved>8){ facing=Math.atan2(player.y-oy,player.x-ox); afterimage(ox,oy); }
      runner.style.left=(player.x/SVGW*100)+"%";
      runner.style.top=(player.y/SVGH*100)+"%";
      var near=nearestPath(player.x,player.y);
      if(near.t>maxPathT) maxPathT=near.t;
      setTrail(maxPathT);
      var nextUnlit=-1;
      for(var ci=0;ci<checkpoints.length;ci++){ if(!checkpoints[ci].reached){ nextUnlit=ci; break; } }
      checkpoints.forEach(function(c,i){
        if(c.reached || i!==nextUnlit) return;
        if(near.dist<=18 && Math.hypot(player.x-c.x,player.y-c.y)<27){
          c.reached=true; c.el.classList.add("reached"); c.el.classList.remove("need"); reached++;
          celebrate(c.x,c.y,"据点完成","#9ff2dc");
          toast("经过据点 "+reached+"/5"); updateHud();
        }
      });
      setTrail(maxPathT);
      supplies.forEach(function(s){
        if(s.got) return;
        if(Math.hypot(player.x-s.x,player.y-s.y)<46){
          s.got=true; s.el.classList.add("collected"); s.el.classList.remove("need"); supplyGot++;
          celebrate(s.x,s.y,"物资完成","#ffd36e");
          toast("拾取散落物资 "+supplyGot+"/3"); updateHud();
        }
      });
      checkGoal();
    }
    function checkGoal(){
      if(state!=="playing") return;
      var near=Math.hypot(player.x-endPoint.x,player.y-endPoint.y)<34;
      if(near && !goalZone){
        goalZone=true;
        if(reached===5 && supplyGot===3) winRun();
        else showGoalWarning();
      }else if(!near){
        goalZone=false;
      }
    }
    function showGoalWarning(){
      state="goal-warning"; dragging=false; runner.classList.remove("dragging");
      checkpoints.forEach(function(c){ if(!c.reached) c.el.classList.add("need"); });
      supplies.forEach(function(s){ if(!s.got) s.el.classList.add("need"); });
      var missing=[];
      if(reached<5) missing.push("据点 "+reached+"/5");
      if(supplyGot<3) missing.push("物资 "+supplyGot+"/3");

      goalMissing.textContent="尚未完成：" + missing.join(" · ");
      goalWarning.classList.add("show"); goalWarning.setAttribute("aria-hidden","false");
      tone(220,.12,"triangle",.012);
      setTimeout(function(){ goalContinue.focus(); },60);
    }
    function closeGoalWarning(){
      goalWarning.classList.remove("show"); goalWarning.setAttribute("aria-hidden","true");
      state="playing"; goalZone=true;
    }
    goalContinue.addEventListener("click",closeGoalWarning);
    function winRun(){
      if(state!=="playing") return;
      state="won"; stopAmbush(); dragging=false; runner.classList.remove("dragging");
      showResult({kicker:"Journey Complete",title:"商道跑通！",desc:"5 个据点全部经过，3 处散落物资全部捡回，任务完成。",stats:'<div><span>据点</span><strong>5/5</strong></div><div><span>物资</span><strong>3/3</strong></div>',button:"再跑一趟",onAction:restartCurrent});
    }
    function makeRoute(){
      var start,end,pts;
      if(isMobileMine){
        start={x:170+Math.random()*70,y:790+Math.random()*30};
        end={x:270+Math.random()*70,y:80+Math.random()*30};
        pts=[start];
        for(var i=1;i<=6;i++){
          var yy=start.y+(end.y-start.y)*i/7;
          var xx=90+Math.random()*380;
          if(i%2===0) xx=SVGW-xx;
          pts.push({x:clamp(xx,45,SVGW-45),y:clamp(yy+(Math.random()*60-30),60,SVGH-60)});
        }
        pts.push(end);
      }else{
        start={x:62,y:290+Math.random()*40}; end={x:815,y:430+Math.random()*70};
        pts=[start];
        for(var j=1;j<=6;j++){
          pts.push({x:clamp(start.x+(end.x-start.x)*j/7+(Math.random()*46-23),80,820),y:clamp(110+Math.random()*350,100,510)});
        }
        pts.push(end);
      }
      var d=smoothPath(pts);
      outer.setAttribute("d",d); basePath.setAttribute("d",d); dashPath.setAttribute("d",d); trail.setAttribute("d",d);
      pathLength=basePath.getTotalLength(); trail.style.strokeDasharray=String(pathLength); trail.style.strokeDashoffset=String(pathLength);
      maxPathT=0;
      cpsGroup.innerHTML=""; checkpoints=[];
      var ts=[.13,.31,.49,.67,.85];
      ts.forEach(function(t,i){
        var pt=basePath.getPointAtLength(pathLength*t);
        var danger=Math.random();
        var cls=danger<.25?"safe":(danger>.78?"danger":"normal");
        var g=document.createElementNS("http://www.w3.org/2000/svg","g");
        g.setAttribute("class","checkpoint "+cls);
        g.setAttribute("transform","translate("+pt.x.toFixed(1)+" "+pt.y.toFixed(1)+")");
        g.innerHTML='<circle class="checkpoint-dot" r="14"/><circle class="checkpoint-core" r="7"/>';
        cpsGroup.appendChild(g);
        checkpoints.push({x:pt.x,y:pt.y,el:g,reached:false,t:t,index:i});
      });
      var endPt=basePath.getPointAtLength(pathLength); endPoint={x:endPt.x,y:endPt.y};
      var endG=document.createElementNS("http://www.w3.org/2000/svg","g");
      endG.setAttribute("transform","translate("+endPt.x.toFixed(1)+" "+endPt.y.toFixed(1)+")");
      endG.setAttribute("class","goal-flag");
      endG.innerHTML='<line x1="0" y1="20" x2="0" y2="-36" stroke="#fff6e0" stroke-width="5" stroke-linecap="round"/><polygon points="0,-36 38,-24 0,-12" fill="#e85656" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><circle cx="0" cy="20" r="5" fill="#fff3cc"/>';
      cpsGroup.appendChild(endG);
      supplyGroup.innerHTML=""; supplies=[];
      for(var si=0;si<3;si++){
        var sx=0,sy=0,guard=0;
        do{
          sx=45+Math.random()*(SVGW-90); sy=65+Math.random()*(SVGH-130);
          guard++;
        }while((nearestPath(sx,sy).dist<58 || checkpoints.some(function(c){return Math.hypot(c.x-sx,c.y-sy)<48;}) || supplies.some(function(s){return Math.hypot(s.x-sx,s.y-sy)<55;})) && guard<80);
        var sg=document.createElementNS("http://www.w3.org/2000/svg","g");
        sg.setAttribute("class","supply-token");
        sg.setAttribute("transform","translate("+sx.toFixed(1)+" "+sy.toFixed(1)+")");
        sg.innerHTML='<ellipse cx="0" cy="12" rx="18" ry="6" fill="rgba(86,42,20,.22)"/><image href="" + CDN + "chest.svg" x="-18" y="-21" width="36" height="36"/>';
        supplyGroup.appendChild(sg);
        supplies.push({x:sx,y:sy,el:sg,got:false});
      }
      teamGroup.innerHTML=""; teams=[];
      for(var ti=0;ti<3;ti++){
        var tx=0,ty=0,tg=0;
        do{
          tx=50+Math.random()*(SVGW-100); ty=75+Math.random()*(SVGH-150); tg++;
        }while((nearestPath(tx,ty).dist<62 || Math.hypot(tx-player.x,ty-player.y)<100 || teams.some(function(t){return Math.hypot(t.x-tx,t.y-ty)<75;})) && tg<80);
        var eg=document.createElement("div");
        eg.className="bandit-team";
        eg.style.left="0"; eg.style.top="0";
        eg.innerHTML='<i class="gw-avatar"></i>';
        teamGroup.appendChild(eg);
        var team={x:tx,y:ty,tx:tx,ty:ty,el:eg,alive:true,angle:0,chase:false};
        teams.push(team); placeTeam(team);
      }
      updateHud();
    }
    function lockAmbushScroll(){
      if(!isMobileViewport()) return;
      document.documentElement.classList.add("mine-ambush-lock");
      document.body.classList.add("mine-ambush-lock");
      document.documentElement.style.setProperty("overflow","hidden","important");
      document.body.style.setProperty("overflow","hidden","important");
    }
    function unlockAmbushScroll(){
      document.documentElement.classList.remove("mine-ambush-lock");
      document.body.classList.remove("mine-ambush-lock");
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    }
    function startAmbush(source,team){
      if(state!=="playing") return;
      state="ambush"; dragging=false; runner.classList.remove("dragging"); endStick(); boostButtonHeld=false; pauseBoostAudio(); syncBoostHeld(); lockAmbushScroll();
      activeTeam=team||null; defeated=0; targets=[]; banditsEl.innerHTML="";
      ambushTitle.textContent="遭遇绿林！";
      ambushDesc.textContent="碰到绿林了！5 秒内击退这队绿林，每名需要命中 2 次。";
      var count=2+Math.floor(Math.random()*2);
      var luRoles=[
        {name:"陆危楼",avatars:[1]},
        {name:"陆烟儿",avatars:[2]},
        {name:"陆无咎",avatars:[1]},
        {name:"陆青崖",avatars:[1]},
        {name:"陆沉",avatars:[1]},
        {name:"陆照",avatars:[1]},
        {name:"陆寻",avatars:[1]},
        {name:"陆衍",avatars:[1]},
        {name:"陆明",avatars:[1]},
        {name:"陆烬",avatars:[1]},
        {name:"陆霜",avatars:[2]},
        {name:"陆小楼",avatars:[3]},
        {name:"陆小婉",avatars:[4]}
      ];
      luRoles.sort(function(){return Math.random()-.5;});
      for(var i=0;i<count;i++){
        var role=luRoles[i%luRoles.length];
        var avatar=role.avatars[Math.floor(Math.random()*role.avatars.length)];
        var btn=document.createElement("button"); btn.type="button"; btn.className="bandit-btn"; btn.dataset.i=String(i);
        btn.dataset.name=role.name;
        btn.innerHTML='<img src="" + CDN + "bandit-avatar'+avatar+'.png" alt="" draggable="false"><span class="bandit-hp"><i></i><i></i></span>';
        (function(index,b){ b.addEventListener("click",function(ev){ev.preventDefault();ev.stopPropagation();hitBandit(index);}); })(i,btn);
        banditsEl.appendChild(btn); targets.push({el:btn,hp:2});
      }
      ambush.classList.add("show"); ambush.setAttribute("aria-hidden","false"); ambushCard.classList.remove("impact");
      ambushEndsAt=performance.now()+5000; timeEl.textContent="5.0s"; timeBar.style.width="100%";
      if(ambushTimer) clearInterval(ambushTimer); ambushTimer=setInterval(updateAmbush,70);
      tone(240,.12,"triangle",.012);
      setTimeout(function(){ if(targets[0]) targets[0].el.focus(); },80);
    }
    function updateAmbush(){
      if(state!=="ambush") return;
      var remain=Math.max(0,(ambushEndsAt-performance.now())/1000);
      timeEl.textContent=remain.toFixed(1)+"s"; timeBar.style.width=(remain/5*100)+"%";
      if(remain<=0) failAmbush();
    }
    function hitBandit(index){
      if(state!=="ambush") return;
      playSkillSound();
      var t=targets[index]; if(!t||t.hp<=0) return;
      t.hp--; var dots=t.el.querySelectorAll(".bandit-hp i"); if(dots[t.hp]) dots[t.hp].classList.add("off");
      var dx=(Math.random()*2-1)*24,dy=(Math.random()*2-1)*20;
      t.el.style.transform="translate("+dx+"px,"+dy+"px) rotate("+(Math.random()*10-5)+"deg)";
      t.el.classList.remove("hit"); void t.el.offsetWidth; t.el.classList.add("hit");
      ambushCard.classList.remove("impact"); void ambushCard.offsetWidth; ambushCard.classList.add("impact");
      shakeMap(); burst(440,285,"#ffb36e");
      tone(300+index*40+(2-t.hp)*60,.08,"triangle",.012);
      if(t.hp<=0){ t.el.classList.add("down"); defeated++; }
      if(defeated>=targets.length) successAmbush();
    }
    function successAmbush(){
      if(ambushTimer) clearInterval(ambushTimer); ambushTimer=null; state="playing";
      ambush.classList.remove("show"); ambush.setAttribute("aria-hidden","true");
      unlockAmbushScroll();
      if(activeTeam && activeTeam.alive){
        var defeatedTeam=activeTeam;
        defeatedTeam.alive=false; defeatedTeam.el.remove(); teamsDown++;
        celebrate(defeatedTeam.x,defeatedTeam.y,"击退绿林","#ff8f9a");
        updateHud(); toast("击退一队绿林，继续跑商！");
      }else{
        toast("绿林被击退，继续护镖！");
      }
      activeTeam=null; riskCooldown=performance.now()+1800;
      tone(820,.1,"sine",.012);
      setPlayer(player.x,player.y);
    }
    function failAmbush(){
      if(ambushTimer) clearInterval(ambushTimer); ambushTimer=null; state="failed";
      ambush.classList.remove("show"); ambush.setAttribute("aria-hidden","true");
      unlockAmbushScroll();
      showResult({kicker:"Ambush Failed",title:"这趟镖丢了…",desc:"5 秒内没能击退绿林，这趟商道失败了。",stats:'<div><span>据点</span><strong>'+reached+'/5</strong></div><div><span>SUPPLIES</span><strong>'+supplyGot+'/3</strong></div>',button:"再跑一次",fail:true,onAction:restartCurrent});
    }
    function stopAmbush(){ if(ambushTimer) clearInterval(ambushTimer); ambushTimer=null; unlockAmbushScroll(); }
    function syncBoostHeld(){
      var held=boostKey || boostButtonHeld || activePointers.size>=2;
      if(held && !boostHeld && boostEnergy>0 && state==="playing"){
        popText(player.x,player.y,"SPEED ×2","cyan"); playBoostAudio();
      }
      boostHeld=held;
      if(!boostHeld){ wrap.classList.remove("boosting"); pauseBoostAudio(); if(!boostActive) updateBoostRing(); }
      updateBoostRing();
    }
    function keyName(e){
      return e.key && e.key.length===1 ? e.key.toLowerCase() : e.key;
    }
    function onKey(e){
      var k=keyName(e);
      if(k==="w"||k==="a"||k==="s"||k==="d"){
        if(state==="playing"){ e.preventDefault(); wasdKeys[k]=true; }
        return;
      }
      if(e.key==="Shift"){ e.preventDefault(); boostKey=true; syncBoostHeld(); }
    }
    function onKeyUp(e){
      var k=keyName(e);
      if(k==="w"||k==="a"||k==="s"||k==="d"){ wasdKeys[k]=false; return; }
      if(e.key==="Shift"){ boostKey=false; syncBoostHeld(); }
    }
    function clearKeyboard(){
      wasdKeys.w=false; wasdKeys.a=false; wasdKeys.s=false; wasdKeys.d=false;
      boostKey=false; syncBoostHeld();
    }
    window.addEventListener("blur",clearKeyboard);
    function onPointerTrack(e){
      if(e.pointerType!=="touch") return;
      activePointers.add(e.pointerId);
      syncBoostHeld();
    }
    function onPointerRelease(e){ activePointers.delete(e.pointerId); syncBoostHeld(); }
    function updateStick(e){
      if(!stick) return;
      var r=stick.getBoundingClientRect();
      var dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
      var max=r.width*.32, len=Math.hypot(dx,dy);
      if(len>max){ dx=dx/len*max; dy=dy/len*max; len=max; }
      stickKnob.style.transform="translate("+dx+"px,"+dy+"px)";
      var strength=Math.min(1,len/max);
      stickVec={x:len?dx/max:0,y:len?dy/max:0};
      if(strength<.12) stickVec={x:0,y:0};
    }
    function endStick(){ stickPointer=null; stickVec={x:0,y:0}; if(stickKnob) stickKnob.style.transform="translate(0,0)"; }
    if(stick){
      stick.addEventListener("pointerdown", function(e){ stickPointer=e.pointerId; try{stick.setPointerCapture(e.pointerId);}catch(_){ } updateStick(e); e.preventDefault(); e.stopPropagation(); }, {passive:false});
      stick.addEventListener("pointermove", function(e){ if(e.pointerId!==stickPointer) return; updateStick(e); e.preventDefault(); }, {passive:false});
      stick.addEventListener("pointerup", function(e){ if(e.pointerId===stickPointer) endStick(); }, {passive:false});
      stick.addEventListener("pointercancel", function(){ endStick(); });
    }
    var boostBtnPointer=null;
    if(boostBtn){
      boostBtn.addEventListener("pointerdown", function(e){ boostBtnPointer=e.pointerId; try{boostBtn.setPointerCapture(e.pointerId);}catch(_){ } boostButtonHeld=true; syncBoostHeld(); e.preventDefault(); e.stopPropagation(); });
      boostBtn.addEventListener("pointerup", function(e){ if(boostBtnPointer!==null && e.pointerId!==boostBtnPointer) return; boostBtnPointer=null; boostButtonHeld=false; syncBoostHeld(); e.preventDefault(); e.stopPropagation(); });
      boostBtn.addEventListener("pointercancel", function(){ boostBtnPointer=null; boostButtonHeld=false; syncBoostHeld(); });
    }
    document.addEventListener("keydown",onKey);
    document.addEventListener("keyup",onKeyUp);
    window.addEventListener("pointerdown",onPointerTrack,true);
    window.addEventListener("pointerup",onPointerRelease,true);
    window.addEventListener("pointercancel",onPointerRelease,true);
    function playerTick(ts){
      if(lastPlayerTick) {
        var dt=Math.min(.05,(ts-lastPlayerTick)/1000);
        var now=performance.now();
        if(state==="playing" && boostHeld){
          if(boostEnergy>0){
            boostEnergy=Math.max(0,boostEnergy-dt);
            if(!boostActive){ boostActive=true; wrap.classList.add("boosting"); playBoostAudio(); }
          }else if(boostActive){
            boostActive=false; wrap.classList.remove("boosting"); pauseBoostAudio();
          }
        }else if(state!=="playing"){
          if(boostActive){ boostActive=false; wrap.classList.remove("boosting"); pauseBoostAudio(); }
        }else{
          if(boostActive){ boostActive=false; wrap.classList.remove("boosting"); pauseBoostAudio(); }
          boostEnergy=Math.min(1,boostEnergy+dt);
        }
        moveTeams(dt);
        var kx=(wasdKeys.d?1:0)-(wasdKeys.a?1:0);
        var ky=(wasdKeys.s?1:0)-(wasdKeys.w?1:0);
        if(state==="playing" && (kx||ky)){
          var kl=Math.hypot(kx,ky);
          kx/=kl; ky/=kl;
          var kstep=playerSpeed*(boostActive?2:1)*dt;
          setPlayer(player.x+kx*kstep, player.y+ky*kstep);
          if(boostActive && now-boostGhostAt>55){ boostGhostAt=now; afterimage(player.x,player.y); }
        }else if(state==="playing" && (stickVec.x||stickVec.y)){
          var jstep=playerSpeed*(boostActive?2:1)*dt;
          setPlayer(player.x+stickVec.x*jstep, player.y+stickVec.y*jstep);
          if(boostActive && now-boostGhostAt>55){ boostGhostAt=now; afterimage(player.x,player.y); }
        }else if(state==="playing" && dragging && moveTarget){
          var dx=moveTarget.x-player.x, dy=moveTarget.y-player.y, dist=Math.hypot(dx,dy);
          if(dist>0.5){
            var step=playerSpeed*(boostActive?2:1)*dt, k=Math.min(1,step/dist);
            setPlayer(player.x+dx*k,player.y+dy*k);
            if(boostActive && now-boostGhostAt>55){ boostGhostAt=now; afterimage(player.x,player.y); }
          }
        }
      }
      lastPlayerTick=ts;
      updateBoostRing();
      playerRAF=requestAnimationFrame(playerTick);
    }
    function onDown(e){ if(state!=="playing") return; dragging=true; runner.classList.add("dragging"); moveTarget=pointSvg(e.clientX,e.clientY); e.preventDefault(); tone(620,.04,"sine",.018); }
    function onMove(e){
      if(!dragging||state!=="playing") return;
      moveTarget=pointSvg(e.clientX,e.clientY); e.preventDefault();
    }
    function onUp(){ dragging=false; moveTarget=null; runner.classList.remove("dragging"); }
    runner.addEventListener("pointerdown",onDown);
    window.addEventListener("pointermove",onMove,{passive:false});
    window.addEventListener("pointerup",onUp);
    playerRAF=requestAnimationFrame(playerTick);
    function checkRisk(){
      if(state!=="playing") return;
      var near=nearestPath(player.x,player.y);
      if(near.dist<=30){ offroadWarned=false; return; }
      if(!offroadWarned){ offroadWarned=true; toast("离开主路，小心游荡的绿林！"); }
    }
    function placeTeam(t){
      var mw=wrap.clientWidth||1, mh=wrap.clientHeight||1;
      t.el.style.transform="translate3d("+(t.x/SVGW*mw)+"px,"+(t.y/SVGH*mh)+"px,0) translate(-50%,-50%)";
    }
    function moveTeams(dt){
      if(state!=="playing") return;
      dt=Math.min(.05,dt||.016);
      teams.forEach(function(t){
        if(!t.alive) return;
        var pd=Math.hypot(player.x-t.x,player.y-t.y);
        var wasChasing=t.chase;
        if(pd<110) t.chase=true;
        else if(pd>180) t.chase=false;
        if(!wasChasing && t.chase) playFoundAudio();
        t.el.classList.toggle("chasing",t.chase);
        var tx=t.chase?player.x:t.tx, ty=t.chase?player.y:t.ty;
        var dx=tx-t.x,dy=ty-t.y,d=Math.hypot(dx,dy);
        if(!t.chase && d<7){ t.tx=50+Math.random()*(SVGW-100); t.ty=75+Math.random()*(SVGH-150); }
        else if(d>0.5){
          t.angle=Math.atan2(dy,dx);
          var speed=(t.chase?63.3:47)*dt;
          t.x+=dx/d*speed; t.y+=dy/d*speed;
        }
        t.x=clamp(t.x,30,SVGW-30); t.y=clamp(t.y,40,SVGH-40);
        placeTeam(t);
        if(performance.now()<teamCooldown) return;
        if(Math.hypot(player.x-t.x,player.y-t.y)<46){
          teamCooldown=performance.now()+1600; startAmbush("team",t);
        }
      });
    }
    function reset(){
      state="playing"; reached=0; supplyGot=0; teamsDown=0; activeTeam=null; dragging=false; goalZone=false; endStick(); boostButtonHeld=false; clearKeyboard();
      var resetMap=wrap.querySelector(".map-canvas");
      if(resetMap) resetMap.style.backgroundImage='url("'+pickMineMap()+'")';
      goalWarning.classList.remove("show"); goalWarning.setAttribute("aria-hidden","true");
      maxPathT=0; riskCooldown=0; teamCooldown=0; offroadWarned=false; boostEnergy=1; boostHeld=false; boostActive=false; boostKey=false; activePointers.clear(); pauseBoostAudio(); wrap.classList.remove("boosting"); updateBoostRing(); stopAmbush(); hideResult();
      ambush.classList.remove("show"); ambushCard.classList.remove("impact"); banditsEl.innerHTML=""; targets=[];
      makeRoute();
      var sp=basePath.getPointAtLength(0); setPlayer(sp.x,sp.y);
      runner.classList.remove("dragging");
      setActions([{label:"重新开始",icon:"reset",onClick:reset}]);
    }
    riskTimer=setInterval(checkRisk,900);
    reset();
    return {stop:function(){ stopAmbush(); if(teamTimer) clearInterval(teamTimer); if(riskTimer) clearInterval(riskTimer); if(playerRAF) cancelAnimationFrame(playerRAF); pauseBoostAudio(); dragging=false; activePointers.clear(); document.removeEventListener("keydown",onKey); document.removeEventListener("keyup",onKeyUp); window.removeEventListener("blur",clearKeyboard); window.removeEventListener("pointerdown",onPointerTrack,true); window.removeEventListener("pointerup",onPointerRelease,true); window.removeEventListener("pointercancel",onPointerRelease,true); window.removeEventListener("pointermove",onMove); window.removeEventListener("pointerup",onUp); }};
  }

  function setProgressBar(cur,total){ setProgress(cur,total); }

  /* ============================================================
     game 3 · 萌宠连连看
  ============================================================ */
  function createLink(){
    var wrap = document.createElement("div");
    wrap.className = "link-wrap";
    wrap.innerHTML = '<div class="link-board" id="linkBoard"></div><svg class="link-path" id="linkPath" viewBox="0 0 880 570" aria-hidden="true"><defs><filter id="linkGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>';
    gameStage.appendChild(wrap);
    var board = wrap.querySelector("#linkBoard");
    var pathSvg = wrap.querySelector("#linkPath");
    var MOBILE = isMobileViewport();
    var COLS = MOBILE ? 5 : 8, ROWS = MOBILE ? 8 : 5, CELL = 100, GAP = 8;
    var VIEW_W = MOBILE ? 560 : 880, VIEW_H = MOBILE ? 880 : 570;
    var BOARD_W = COLS*CELL + (COLS-1)*GAP;
    var BOARD_H = ROWS*CELL + (ROWS-1)*GAP;
    var OFFX = (VIEW_W - BOARD_W)/2, OFFY = (VIEW_H - BOARD_H)/2;
    pathSvg.setAttribute("viewBox","0 0 "+VIEW_W+" "+VIEW_H);
    if(MOBILE) gameStage.classList.add("mobile-link-stage");
    var types = [];
    for(var i=0;i<20;i++) types.push(i);
    var allTypes = types.concat(types);
    var tiles = [];
    var selected = null;
    var lock = false;
    var pairs = 0;
    var grid = [];
    var stopped = false;
    var hintTimer = null;
    function shuffle(a){
      for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
      return a;
    }
    function imageFor(type){ return "" + CDN + "pets/pet" + String(type).padStart(2,"0") + ".jpg"; }
    function build(){
      board.innerHTML = "";
      pathSvg.innerHTML = "";
      tiles = [];
      grid = [];
      var order = shuffle(allTypes.slice());
      for(var r=0;r<ROWS;r++){
        grid[r] = [];
        for(var c=0;c<COLS;c++){
          var type = order[r*COLS+c];
          var b = document.createElement("button");
          b.type = "button";
          b.className = "pet-tile";
          b.style.backgroundImage = 'url("'+imageFor(type)+'")';
          b.style.animationDelay = ((r*COLS+c)*7) + "ms";
          b.classList.add("deal");
          b.dataset.r = r; b.dataset.c = c; b.dataset.type = String(type);
          b.setAttribute("aria-label", "门派宠物方块 · 图案" + (type + 1));
          var cell = document.createElement("div");
          cell.className = "link-cell";
          cell.appendChild(b);
          board.appendChild(cell);
          var d = {r:r,c:c,type:type,el:b,cell:cell,gone:false};
          grid[r][c] = d;
          tiles.push(d);
          b.addEventListener("click", clickTile.bind(null,d));
        }
      }
    }
    function occupied(r,c){
      return r >= 0 && r < ROWS && c >= 0 && c < COLS && !!grid[r][c] && !grid[r][c].gone;
    }
    function clearRow(r,c1,c2){
      var start = Math.min(c1,c2), end = Math.max(c1,c2);
      for(var c=start+1;c<end;c++){ if(occupied(r,c)) return false; }
      return true;
    }
    function clearCol(c,r1,r2){
      var start = Math.min(r1,r2), end = Math.max(r1,r2);
      for(var r=start+1;r<end;r++){ if(occupied(r,c)) return false; }
      return true;
    }
    function findPath(a,b){
      var ra=a.r, ca=a.c, rb=b.r, cb=b.c;
      if(ra === rb && clearRow(ra,ca,cb)){ return [[ra,ca],[ra,cb]]; }
      if(ca === cb && clearCol(ca,ra,rb)){ return [[ra,ca],[rb,cb]]; }
      if(!occupied(ra,cb) && clearRow(ra,ca,cb) && clearCol(cb,ra,rb)){ return [[ra,ca],[ra,cb],[rb,cb]]; }
      if(!occupied(rb,ca) && clearCol(ca,ra,rb) && clearRow(rb,ca,cb)){ return [[ra,ca],[rb,ca],[rb,cb]]; }
      for(var k=-1;k<=COLS;k++){
        if(k === ca || k === cb) continue;
        if(occupied(ra,k) || occupied(rb,k)) continue;
        if(clearRow(ra,ca,k) && clearCol(k,ra,rb) && clearRow(rb,k,cb)){
          return [[ra,ca],[ra,k],[rb,k],[rb,cb]];
        }
      }
      for(var m=-1;m<=ROWS;m++){
        if(m === ra || m === rb) continue;
        if(occupied(m,ca) || occupied(m,cb)) continue;
        if(clearCol(ca,ra,m) && clearRow(m,ca,cb) && clearCol(cb,m,rb)){
          return [[ra,ca],[m,ca],[m,cb],[rb,cb]];
        }
      }
      return null;
    }
    function findAnyPair(){
      for(var i=0;i<tiles.length;i++){
        var a = tiles[i];
        if(a.gone) continue;
        for(var j=i+1;j<tiles.length;j++){
          var b = tiles[j];
          if(b.gone || a.type !== b.type) continue;
          var p = findPath(a,b);
          if(p) return [a,b,p];
        }
      }
      return null;
    }
    function linkPoint(r,c){
      var x = OFFX + c*(CELL+GAP) + CELL/2;
      var y = OFFY + r*(CELL+GAP) + CELL/2;
      if(c < 0) x = OFFX - 13;
      else if(c >= COLS) x = OFFX + BOARD_W + 13;
      if(r < 0) y = OFFY - 13;
      else if(r >= ROWS) y = OFFY + BOARD_H + 13;
      return {x:x,y:y};
    }
    function drawPath(p){
      var points = p.map(function(x){ var q=linkPoint(x[0],x[1]); return q.x+","+q.y; }).join(" ");
      pathSvg.innerHTML =
        '<polyline points="'+points+'" fill="none" stroke="#c7aeff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity=".28" filter="url(#linkGlow)"/>'+
        '<polyline points="'+points+'" fill="none" stroke="#a98cf0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'+
        '<polyline points="'+points+'" fill="none" stroke="#fff3ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>'+
        '<circle cx="'+linkPoint(p[0][0],p[0][1]).x+'" cy="'+linkPoint(p[0][0],p[0][1]).y+'" r="5" fill="#fff"/><circle cx="'+linkPoint(p[p.length-1][0],p[p.length-1][1]).x+'" cy="'+linkPoint(p[p.length-1][0],p[p.length-1][1]).y+'" r="5" fill="#fff"/>';
      setTimeout(function(){ pathSvg.innerHTML = ""; }, 500);
    }
    function linkFx(tile){
      var wrapRect = wrap.getBoundingClientRect();
      var rect = tile.el.getBoundingClientRect();
      var fx = document.createElement("div");
      fx.className = "link-fx";
      fx.style.left = (rect.left - wrapRect.left + rect.width/2) + "px";
      fx.style.top = (rect.top - wrapRect.top + rect.height/2) + "px";
      var ring = document.createElement("span"); ring.className="link-fx-ring"; fx.appendChild(ring);
      var plus = document.createElement("span"); plus.className="link-plus"; plus.textContent="+1 对"; fx.appendChild(plus);
      var colors = ["#fff7c9","#ffd8f1","#d9c7ff","#aef4dc","#fff"];
      for(var i=0;i<12;i++){
        var s=document.createElement("i"); s.className="link-spark";
        var ang=Math.PI*2*i/12 + Math.random()*.4;
        var dist=35+Math.random()*42;
        s.style.background=colors[i%colors.length];
        s.style.width=(5+Math.random()*5)+"px"; s.style.height=s.style.width;
        s.style.setProperty("--dx",Math.cos(ang)*dist+"px");
        s.style.setProperty("--dy",Math.sin(ang)*dist+"px");
        fx.appendChild(s);
      }
      wrap.appendChild(fx);
      setTimeout(function(){ if(fx.parentNode) fx.remove(); }, 820);
    }
    function matchPair(a,b,p){
      drawPath(p);
      lock = true;
      a.el.classList.remove("selected","hint");
      b.el.classList.remove("hint");
      clearTimeout(hintTimer);
      selected = null;
      a.gone = true; b.gone = true;
      a.el.classList.add("matched"); b.el.classList.add("matched");
      grid[a.r][a.c] = null; grid[b.r][b.c] = null;
      linkFx(a); linkFx(b);
      pairs += 1;
      setProgress(pairs,20);
      tone(880,.08,"sine",.035);
      setTimeout(function(){ tone(1120,.1,"sine",.025); }, 90);
      setTimeout(function(){
        a.el.classList.add("removed"); b.el.classList.add("removed");
        a.el.style.visibility = "hidden"; b.el.style.visibility = "hidden";
        if(pairs < 20) ensureSolvable();
        lock = false;
        if(pairs >= 20){
          showResult({
            kicker:"Collection Complete",
            title:"门派图鉴集齐！",
            desc:"40 枚门派宠物方块全部配对完成。",
            stats:'<div><span>PAIRS</span><strong>20/20</strong></div>',
            button:"再来一局",
            onAction:restartCurrent
          });
        }
      }, 560);
    }
    function clickTile(d){
      if(lock || d.gone) return;
      if(selected === d){
        d.el.classList.remove("selected");
        selected = null;
        return;
      }
      if(!selected){
        selected = d;
        d.el.classList.add("selected");
        tone(560,.05,"sine",.02);
        return;
      }
      var a = selected;
      var p = a.type === d.type ? findPath(a,d) : null;
      if(p){
        matchPair(a,d,p);
      }else{
        a.el.classList.remove("selected");
        a.el.classList.add("wrong");
        d.el.classList.add("wrong");
        selected = null;
        lock = true;
        tone(180,.1,"triangle",.025);
        setTimeout(function(){
          a.el.classList.remove("wrong"); d.el.classList.remove("wrong");
          lock = false;
        }, 380);
      }
    }
    function hint(){
      var pair = findAnyPair();
      if(!pair){ shuffleBoard(); return; }
      pair[0].el.classList.add("hint"); pair[1].el.classList.add("hint");
      toast("看这里，这两个门派宠物可以连起来～");
      clearTimeout(hintTimer);
      hintTimer = setTimeout(function(){ pair[0].el.classList.remove("hint"); pair[1].el.classList.remove("hint"); }, 2200);
      tone(760,.06,"sine",.02);
      setTimeout(function(){ tone(135,.11,"triangle",.04); }, 45);
    }
    function applyTypes(list, values){
      list.forEach(function(t, i){
        t.type = values[i];
        t.el.style.backgroundImage = 'url("'+imageFor(t.type)+'")';
        t.el.classList.remove("hint");
      });
    }
    function ensureSolvable(){
      var remaining = tiles.filter(function(t){ return !t.gone; });
      for(var attempt=0;attempt<80;attempt++){
        if(findAnyPair()) return true;
        applyTypes(remaining, shuffle(remaining.map(function(t){ return t.type; })));
      }
      return false;
    }
    function shuffleBoard(){
      var remaining = tiles.filter(function(t){ return !t.gone; });
      if(!remaining.length) return;
      remaining.forEach(function(t,i){ t.el.style.animationDelay=(i*7)+"ms"; t.el.classList.add("shuffling"); });
      applyTypes(remaining, shuffle(remaining.map(function(t){ return t.type; })));
      ensureSolvable();
      setTimeout(function(){ remaining.forEach(function(t){ t.el.classList.remove("shuffling"); t.el.style.animationDelay=""; }); },650);
      if(selected){ selected.el.classList.remove("selected"); selected = null; }
      toast("门派宠物重新排好啦");
      tone(480,.08,"sine",.02);
    }
    function reset(){
      if(hintTimer) clearTimeout(hintTimer);
      selected = null; lock = false; pairs = 0;
      setProgress(0,20);
      build();
      ensureSolvable();
      setActions([
        {label:"提示", icon:"hint", onClick:hint},
        {label:"重排", icon:"shuffle", onClick:shuffleBoard}
      ]);
    }
    reset();
    return {stop:function(){ stopped = true; if(hintTimer) clearTimeout(hintTimer); }};
  }

  /* ============================================================
     game 4 · 美人拼拼图
  ============================================================ */
  function createPuzzle(){
    var wrap = document.createElement("div");
    wrap.className = "puzzle-wrap";
    wrap.innerHTML = '<div class="puzzle-board" id="puzzleBoard"></div>';
    gameStage.appendChild(wrap);
    var board = wrap.querySelector("#puzzleBoard");
    var pile = document.createElement("div");
    pile.className = "puzzle-pile";
    pile.innerHTML = '<div class="puzzle-pile-label">碎片盘 · <span id="puzzleRemain">9</span> 片</div>';
    if(isMobileViewport()){
      wrap.appendChild(pile);
      gameStage.classList.add("mobile-puzzle-stage");
    }else{
      stage.appendChild(pile);
    }
    var remain = pile.querySelector("#puzzleRemain");
    var ROWS=3, COLS=4, TOTAL=12;
    var MOBILE_PUZZLE=isMobileViewport();
    var slots=[], pieces={}, placed=0, selected=null, lock=false;
    var drag=null;
    var suppress=0;
    var hintLevel=0;
    function posFor(id){ return {x:(id%COLS)/(COLS-1)*100,y:Math.floor(id/COLS)/(ROWS-1)*100}; }
    function buildBoard(){
      board.innerHTML="";
      slots=[];
      for(var i=0;i<TOTAL;i++){
        var s=document.createElement("button");
        s.type="button"; s.className="puzzle-slot"; s.dataset.id=i;
        s.addEventListener("click", function(id){ return function(){ slotClick(id); }; }(i));
        board.appendChild(s);
        slots.push({id:i,el:s,filled:false});
      }
    }
    function pileSpot(id, randomize){
      var rots=[-1.5,1,-1,1.5,-1,1,1,-1,1,-1,1,-1];
      if(MOBILE_PUZZLE){
        var mc=id%3, mr=Math.floor(id/3);
        var mjx=randomize?(Math.random()*8-4):0;
        var mjy=randomize?(Math.random()*4-2):0;
        return {
          x: 10 + mc*74 + mjx,
          y: 5 + mr*42 + mjy,
          rot: randomize ? (Math.random()*5-2.5) : rots[id]
        };
      }
      var col=id%4, row=Math.floor(id/4);
      var jx=randomize ? (Math.random()*6-3) : (col===1?2:0);
      var jy=randomize ? (Math.random()*6-3) : 0;
      return {
        x: 16 + col*78 + jx,
        y: 12 + row*55 + jy,
        rot: randomize ? (Math.random()*3-1.5) : rots[id]
      };
    }
    function buildPile(){
      pile.querySelectorAll(".puzzle-piece").forEach(function(el){ el.remove(); });
      pieces={};
      var order=[];
      for(var k=0;k<TOTAL;k++) order.push(k);
      for(var s=order.length-1;s>0;s--){
        var j=Math.floor(Math.random()*(s+1));
        var tmp=order[s]; order[s]=order[j]; order[j]=tmp;
      }
      for(var slot=0;slot<TOTAL;slot++){
        var id=order[slot];
        var p=posFor(id), spot=pileSpot(slot,true);
        var b=document.createElement("button");
        b.type="button"; b.className="puzzle-piece"; b.dataset.id=id;
        b.style.backgroundImage='url("" + CDN + "puzzle-pieces/puzzle-'+id+'.jpg")';
        b.style.left=spot.x+"px"; b.style.top=spot.y+"px";
        b.style.setProperty("--px", spot.x+"px"); b.style.setProperty("--py", spot.y+"px");
        b.style.setProperty("--rot", spot.rot.toFixed(1)+"deg");
        b.style.zIndex=String(10+slot);
        b.setAttribute("aria-label","右侧碎片盘第"+(id+1)+"块图谱碎片");
        var piece={id:id,el:b,pos:p,taken:false};
        b.addEventListener("click", function(piece){ return function(ev){ pieceClick(piece,ev); }; }(piece));
        b.addEventListener("pointerdown", function(piece){ return function(ev){ pointerDown(piece,ev); }; }(piece));
        pile.appendChild(b);
        pieces[id]=piece;
      }
      remain.textContent=String(TOTAL-placed);
    }
    function pieceClick(piece,event){
      if(lock || piece.taken || Date.now()<suppress) return;
      if(selected===piece){ piece.el.classList.remove("selected"); selected=null; return; }
      if(selected) selected.el.classList.remove("selected");
      selected=piece; piece.el.classList.add("selected");
      tone(560,.05,"sine",.02);
    }
    function slotClick(id){
      if(lock) return;
      var slot=slots[id];
      if(slot.filled) return;
      if(!selected){ toast("先从右侧碎片堆选一块，再点这里"); return; }
      attempt(selected,slot);
    }
    function pointerDown(piece,event){
      if(lock || piece.taken || event.button>0) return;
      drag={piece:piece,x:event.clientX,y:event.clientY,active:false,ghost:null,pid:event.pointerId};
    }
    function onMove(event){
      if(!drag || event.pointerId!==drag.pid) return;
      drag.x=event.clientX; drag.y=event.clientY;
      if(!drag.active){
        var rect=drag.piece.el.getBoundingClientRect();
        var dx=event.clientX-(rect.left+rect.width/2);
        var dy=event.clientY-(rect.top+rect.height/2);
        if(Math.hypot(dx,dy)<8) return;
        beginDrag();
      }
      if(!drag.active) return;
      drag.ghost.style.left=event.clientX+"px";
      drag.ghost.style.top=event.clientY+"px";
    }
    function beginDrag(){
      if(!drag) return;
      drag.active=true;
      var piece=drag.piece;
      if(selected){selected.el.classList.remove("selected");selected=null;}
      var rect=piece.el.getBoundingClientRect();
      var g=document.createElement("div");
      g.className="drag-ghost";
      g.style.width=rect.width+"px";g.style.height=rect.height+"px";
      g.style.left=drag.x+"px";g.style.top=drag.y+"px";
      g.style.backgroundImage='url("" + CDN + "puzzle-pieces/puzzle-'+piece.id+'.jpg")';
      piece.el.classList.add("picked");
      document.body.appendChild(g);
      drag.ghost=g;
      tone(640,.04,"sine",.015);
    }
    function onUp(event){
      if(!drag || event.pointerId!==drag.pid) return;
      var d=drag; drag=null;
      if(!d.active) return;
      suppress=Date.now()+300;
      if(d.ghost) d.ghost.remove();
      var el=document.elementFromPoint(event.clientX,event.clientY);
      var slotEl=el && el.closest ? el.closest(".puzzle-slot") : null;
      if(slotEl){
        var slot=slots[parseInt(slotEl.dataset.id,10)];
        if(slot && !slot.filled) attempt(d.piece,slot);
        else toast("这里已经有碎片啦");
      }else{
        toast("把碎片放到左侧棋盘里哦");
      }
      if(d.piece && !d.piece.taken) d.piece.el.classList.remove("picked");
    }
    function puzzleFx(slot){
      var wr=wrap.getBoundingClientRect(), sr=slot.el.getBoundingClientRect();
      var fx=document.createElement("div");
      fx.className="puzzle-fx";
      fx.style.left=(sr.left-wr.left+sr.width/2)+"px";
      fx.style.top=(sr.top-wr.top+sr.height/2)+"px";
      var ring=document.createElement("span");ring.className="puzzle-fx-ring";fx.appendChild(ring);
      var plus=document.createElement("span");plus.className="puzzle-fx-text";plus.textContent="+1";fx.appendChild(plus);
      var colors=["#fff7c9","#ffd8a8","#fff","#d9c7ff","#ffe8a0"];
      for(var i=0;i<10;i++){
        var s=document.createElement("i");s.className="puzzle-fx-spark";
        var ang=Math.PI*2*i/10+Math.random()*.35, dist=28+Math.random()*40;
        s.style.background=colors[i%colors.length];
        s.style.width=(5+Math.random()*4)+"px";s.style.height=s.style.width;
        s.style.setProperty("--dx",Math.cos(ang)*dist+"px");
        s.style.setProperty("--dy",Math.sin(ang)*dist+"px");
        fx.appendChild(s);
      }
      wrap.appendChild(fx);
      setTimeout(function(){ if(fx.parentNode) fx.remove(); },900);
    }
    function attempt(piece,slot){
      if(lock || piece.taken || slot.filled) return;
      if(piece.id===slot.id){
        piece.taken=true; piece.el.classList.add("taken");
        slot.filled=true; slot.el.classList.add("filled","just-placed");
        slot.el.style.backgroundImage='url("" + CDN + "puzzle-pieces/puzzle-'+piece.id+'.jpg")';
        slot.el.disabled=true;
        if(selected===piece) selected=null;
        placed+=1;
        remain.textContent=String(TOTAL-placed);
        setProgress(placed,TOTAL);
        puzzleFx(slot);
        tone(780,.07,"sine",.025);
        setTimeout(function(){ tone(1040,.08,"sine",.02); }, 70);
        setTimeout(function(){ slot.el.classList.remove("just-placed"); },620);
        if(placed>=TOTAL){
          board.classList.add("solved");
          setTimeout(function(){
            showResult({
              kicker:"Scroll Restored",
              title:"兵家图谱复原！",
              desc:"十二块碎片全部回到唯一正确的位置。",
              stats:'<div><span>PIECES</span><strong>12/12</strong></div>',
              button:"再拼一次",
              onAction:restartCurrent
            });
          }, 520);
        }
      }else{
        slot.el.classList.add("wrong");
        piece.el.classList.add("wrong");
        toast("这块好像不在这里～再试试");
        tone(190,.1,"triangle",.025);
        setTimeout(function(){ slot.el.classList.remove("wrong"); piece.el.classList.remove("wrong"); },380);
      }
    }
    function hint(){
      var empty=slots.filter(function(s){return !s.filled;});
      if(!empty.length) return;
      if(hintLevel < .15){
        hintLevel=Math.min(.15, hintLevel+.05);
        board.style.setProperty("--hint-opacity", hintLevel.toFixed(2));
        toast("底图透明度 " + Math.round(hintLevel*100) + "%");
        tone(640,.07,"sine",.02);
        return;
      }
      var slot=empty[Math.floor(Math.random()*empty.length)];
      var piece=pieces[slot.id];
      if(!piece || piece.taken) return;
      slot.el.classList.add("hint"); piece.el.classList.add("hint");
      toast("看这里：碎片已发光，正确位置有描边");
      setTimeout(function(){ slot.el.classList.remove("hint"); piece.el.classList.remove("hint"); },2400);
      tone(820,.06,"sine",.02);
    }
    function shuffleTray(){
      Object.keys(pieces).forEach(function(id){
        var piece=pieces[id];
        if(piece.taken) return;
        var spot=pileSpot(Number(id),true);
        piece.el.style.left=spot.x+"px"; piece.el.style.top=spot.y+"px";
        piece.el.style.setProperty("--rot", spot.rot.toFixed(1)+"deg");
      });
      toast("碎片重新排好啦");
      tone(500,.07,"sine",.02);
    }
    function reset(){
      placed=0; selected=null; lock=false; drag=null; hintLevel=0;
      board.style.setProperty("--hint-opacity","0");
      setProgress(0,TOTAL);
      buildBoard();
      buildPile();
      remain.textContent=String(TOTAL);
      setActions([
        {label:"提示", icon:"hint", onClick:hint},
        {label:"重排", icon:"shuffle", onClick:shuffleTray}
      ]);
    }
    window.addEventListener("pointermove",onMove,{passive:true});
    window.addEventListener("pointerup",onUp);
    reset();
    return {stop:function(){ window.removeEventListener("pointermove",onMove); window.removeEventListener("pointerup",onUp); if(pile.parentNode) pile.remove(); }};
  }


  /* ---------- ambient background particles ---------- */
  function initBgParticles(){
    var canvas=document.getElementById("bgParticles");
    if(!canvas || !canvas.getContext) return null;
    var stage=document.querySelector(".stage");
    var ctx=canvas.getContext("2d");
    var dpr=Math.min(2,window.devicePixelRatio||1);
    var W=1,H=1,sparks=[],meteors=[];
    var last=performance.now();
    var nextMeteor=last+1200+Math.random()*1400;
    var rafId=0;
    var resizeObserver=null;
    var palette=[[255,255,255],[255,241,190],[255,209,231],[190,235,255],[220,205,255]];
    var glowSprites=palette.map(function(c){
      var sc=document.createElement("canvas"); sc.width=64; sc.height=64;
      var sg=sc.getContext("2d");
      var grad=sg.createRadialGradient(32,32,0,32,32,32);
      grad.addColorStop(0,"rgba("+c[0]+","+c[1]+","+c[2]+",1)");
      grad.addColorStop(.18,"rgba("+c[0]+","+c[1]+","+c[2]+",.72)");
      grad.addColorStop(.45,"rgba("+c[0]+","+c[1]+","+c[2]+",.22)");
      grad.addColorStop(1,"rgba("+c[0]+","+c[1]+","+c[2]+",0)");
      sg.fillStyle=grad; sg.fillRect(0,0,64,64);
      return sc;
    });
    function rand(a,b){return a+Math.random()*(b-a);}
    function makeSpark(){
      return {x:Math.random()*W,y:Math.random()*H,r:rand(.9,2.6),vy:rand(9,28),vx:rand(-5,5),phase:Math.random()*Math.PI*2,tw:rand(.45,1.15),base:rand(.25,.7),ci:Math.floor(Math.random()*palette.length)};
    }
    function resize(){
      W=window.innerWidth;
      H=window.innerHeight;
      canvas.width=Math.max(1,Math.round(W*dpr));
      canvas.height=Math.max(1,Math.round(H*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);
      var target=Math.max(65,Math.min(220,Math.round(W*H/8500)));
      while(sparks.length<target) sparks.push(makeSpark());
      if(sparks.length>target) sparks.length=target;
      sparks.forEach(function(s){ if(s.x>W) s.x=Math.random()*W; if(s.y>H) s.y=Math.random()*H; });
    }
    function spawnMeteor(){
      var ang=rand(30,45)*Math.PI/180;
      var speed=rand(150,245);
      meteors.push({
        x:rand(W*.56,W*1.04),y:rand(-100,-18),
        vx:-Math.cos(ang)*speed,vy:Math.sin(ang)*speed,
        len:rand(110,230),w:rand(1.8,3.8),hue:[325,42,188,160,272][Math.floor(Math.random()*5)],
        age:0,life:rand(2.1,3.8)
      });
    }
    function draw(now){
      var dt=Math.min(.05,(now-last)/1000); last=now;
      ctx.clearRect(0,0,W,H);
      ctx.globalCompositeOperation="lighter";
      for(var i=0;i<sparks.length;i++){
        var s=sparks[i];
        s.y+=s.vy*dt; s.x+=s.vx*dt;
        if(s.y>H+4){s.y=-4;s.x=Math.random()*W;}
        if(s.x<-4)s.x=W+4; if(s.x>W+4)s.x=-4;
        var a=s.base*(.45+.55*(.5+.5*Math.sin(now*.001*s.tw+s.phase)));
        var gs=s.r*8;
        ctx.globalAlpha=a;
        ctx.drawImage(glowSprites[s.ci],s.x-gs/2,s.y-gs/2,gs,gs);
        ctx.globalAlpha=1;
      }
      if(now>nextMeteor){ spawnMeteor(); if(Math.random()<.28) spawnMeteor(); nextMeteor=now+rand(1700,3100); }
      for(var j=meteors.length-1;j>=0;j--){
        var m=meteors[j]; m.age+=dt; m.x+=m.vx*dt; m.y+=m.vy*dt;
        if(m.y>H+90 || m.x<-160 || m.x>W+160){ meteors.splice(j,1); continue; }
        var sp=Math.hypot(m.vx,m.vy)||1;
        var tx=m.x-m.vx/sp*m.len, ty=m.y-m.vy/sp*m.len;
        var g=ctx.createLinearGradient(tx,ty,m.x,m.y);
        g.addColorStop(0,"hsla("+m.hue+",100%,72%,0)");
        g.addColorStop(.45,"hsla("+m.hue+",100%,72%,.35)");
        g.addColorStop(1,"hsla("+m.hue+",100%,78%,.95)");
        ctx.strokeStyle=g; ctx.lineWidth=m.w; ctx.lineCap="round";
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(m.x,m.y); ctx.stroke();
        var rg=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,16);
        rg.addColorStop(0,"hsla("+m.hue+",100%,88%,.95)");
        rg.addColorStop(.25,"hsla("+m.hue+",100%,76%,.55)");
        rg.addColorStop(1,"hsla("+m.hue+",100%,70%,0)");
        ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(m.x,m.y,16,0,Math.PI*2); ctx.fill();
      }
      rafId=requestAnimationFrame(draw);
    }
    resize();
    if(window.ResizeObserver){ resizeObserver=new ResizeObserver(function(){ resize(); }).observe(stage); }
    window.addEventListener("resize", resize);
    rafId=requestAnimationFrame(draw);
    return function cleanupParticles(){
      if(rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if(resizeObserver && resizeObserver.unobserve){ try{ resizeObserver.disconnect(); }catch(e){} }
      sparks.length=0; meteors.length=0;
    };
  }
  var cleanupParticles = initBgParticles();

  /* boot */
  fitStage();
  var initial = 1;
  var gm = null;
  try { gm = new URLSearchParams(location.search).get("game"); } catch (e) {}
  if (gm && /^[1-4]$/.test(gm)) initial = Number(gm);
  switchGame(initial, true);

  /* ---------- teardown：路由离开时清理所有全局副作用 ---------- */
  return function destroy() {
    if (controller && controller.stop) controller.stop();
    controller = null;
    if (applyResponsiveTimer) clearInterval(applyResponsiveTimer);
    window.removeEventListener("resize", fitStage);
    window.removeEventListener("orientationchange", fitStage);
    if (window.visualViewport) window.visualViewport.removeEventListener("resize", fitStage);
    document.removeEventListener("pointerdown", startPageBgm);
    document.removeEventListener("keydown", startPageBgm);
    document.removeEventListener("touchstart", startPageBgm);
    document.removeEventListener("click", onDocClickCapture, true);
    document.removeEventListener("touchmove", onDocTouchMove);
    if (cleanupParticles) cleanupParticles();
    var ghost = document.querySelector(".drag-ghost");
    if (ghost) ghost.remove();
    try { pageBgm.pause(); pageBgm.src = ""; } catch (e) {}
    if (audioCtx) { try { audioCtx.close(); } catch (e) {} audioCtx = null; }
    document.body.classList.remove("is-mobile", "rules-open", "mobile-menu-open", "mine-ambush-lock");
    document.documentElement.classList.remove("mine-ambush-lock");
    document.documentElement.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow");
    if (gameStage) gameStage.innerHTML = "";
    if (footerActions) footerActions.innerHTML = "";
    [rulesOverlay, resultOverlay, claimOverlay, closeOverlay].forEach(function (el) {
      if (el && el.parentNode === document.body) el.parentNode.removeChild(el);
    });
  };
}
