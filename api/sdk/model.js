const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    i = (data[0] - 15.61) / 9.00685947419741
    r = (data[1] - 4.55) / 1.94587567968872
    return [i, r]
}


function denormalized(data){
    v = (data[0] * 2.5862105189804) + 5.28
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
