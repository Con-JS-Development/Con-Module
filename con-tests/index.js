import { system, world } from '@minecraft/server';
import { AsyncScoreboardDatabase, ScoreboardDatabase } from '../con-api.js';

const text = `aafasfaklkejflkjadlsfkjaejoiororutzrázqšíárqšpčráqrcnpeázrqeajmoeirunýtzngfaů§iprčpcrqůeqiofudjůxč,prqerůnuqčůurqíčríiréq§r`;

async function test(){
    const db = ScoreboardDatabase.create("my_db");
    const a = db.get("test")??{};
    a[Math.random()] = "Test bob!";
    db.set("test",a);
    console.warn(JSON.stringify(a,null, "   "));
    world.sendMessage("Size: " + db.size + " x " + text.length);
}
system.runTimeout(test,10);