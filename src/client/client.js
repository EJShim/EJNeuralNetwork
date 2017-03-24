var E_Manager = require('./E_Manager.js');


mgr = new E_Manager()

document.getElementById("train").onclick = function(){mgr.OnClickTrain();}
document.getElementById("test").onclick = function(){mgr.OnClickRun();}
document.getElementById("stop").onclick = function(){mgr.StopTrainning();}
