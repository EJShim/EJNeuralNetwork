var convnetjs = require('convnetjs');


//Machine Learning Manager
function E_MLManager(Mgr, network)
{
  this.Mgr = Mgr;


  layer_defs = [];
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:3});
  layer_defs.push({type:'fc', num_neurons:20, activation:'tanh'});
  layer_defs.push({type:'regression', num_neurons:3});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});


  this.network = new convnetjs.Net();
  // this.network.makeLayers(layer_defs);
  //
  //

  this.network.fromJSON( JSON.parse(network) );

  ///Initialize
  this.Initialize();
}

E_MLManager.prototype.Initialize = function()
{

}

E_MLManager.prototype.PutVolume = function( volume )
{
  var convVol = new convnetjs.Vol(volume);

  //Calculate Possibility
  var pred = this.network.forward(convVol);


  var result = [];
  result[0] = volume[0] + 2;
  result[1] = volume[1] * 2;
  result[2] = volume[0] + volume[1] + volume[2];

  trainer = new convnetjs.SGDTrainer(this.network, {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});
  trainer.train(convVol, result);


  var log = "[0] : +2, [1] : *2, [2] : [0] + [1] + [2]" +
            "<br>input Data :" + volume +
            "<br><br>Ground Truth : " + result +
            "<br>Predicted : " + pred.w;
  //Set log
  this.Mgr.SetLog(log)

  ///Save Network
  var jsonNetwork = JSON.stringify( this.network.toJSON() );
  this.Mgr.SocketMgr().EmitData("SAVE_NETWORK", jsonNetwork);

}

module.exports = E_MLManager;
