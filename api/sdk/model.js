const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    i = (data[0] - 15.448) / 8.85726626987137
    r = (data[1] - 6.56533333333333) / 3.41440379827617
    return [i, r]
}


function denormalized(data){
    v = (data[0] * 2.87593540973297) + 4.77884615384615
    p = (data[1] * 3.04795013082563) + 4.73
    m = (data[2] * 2.87300216048325) + 4.78
    d = (data[3] * 2.96007097921996) + 4.84
    return [v, p, m, d]
}
//     p = (data[2] - 0.842) / 0.100
//     s = (data[3] - 213.504 / 7.705


async function predict(data){
    let in_dim = 2;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/bugi-bit/togel/main/public/tog_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
