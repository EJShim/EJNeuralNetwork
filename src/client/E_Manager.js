var E_SocketManager = require('./E_SocketManager.js');
var E_MLManager = require('./E_MLManager.js');
function E_Manager()
{
  var m_socketMgr = new E_SocketManager(this);
  this.mlMgr = null;
  this.m_bRunTrainning = false;


  this.SocketMgr = function()
  {
    return m_socketMgr;
  }

}


E_Manager.prototype.Initialize = function()
{
  console.log("haha")
}

E_Manager.prototype.SetLog = function(log)
{
  document.getElementById("log").innerHTML = log;
}

E_Manager.prototype.OnInitialize = function(network)
{
  this.mlMgr = new E_MLManager(this, network);

  this.Initialize();
}


E_Manager.prototype.OnClickTrain = function()
{
  this.m_bRunTrainning = true;
  this.RunTrainning();
}

E_Manager.prototype.StopTrainning = function()
{
  this.m_bRunTrainning = false;
}

E_Manager.prototype.RunTrainning = function()
{

  var input = [this.Frand(-10, 10), this.Frand(-10, 10), this.Frand(-10, 10)];

  this.mlMgr.PutVolume(input)
}

E_Manager.prototype.OnClickRun = function()
{
  this.RunTrainning();
}

E_Manager.prototype.Frand = function(min, max)
{
  var range = max - min;
  var value = Math.random();

  value *= range;
  value += min;

  return value;
}

module.exports = E_Manager;
