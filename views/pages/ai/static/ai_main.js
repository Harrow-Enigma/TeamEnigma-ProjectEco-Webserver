var featlab = null;
var vis_loaded = false;

const FEAT_PARENT_ID = 'feature_control';
const LAB_PARENT_ID = 'label_vis';

var feature_sliders = {};
var label_vis = {};
var oldvals = [];

var model;


var features_mean, features_stddv, features_ofst, features_range;
var labels_mean, labels_stddv, labels_ofst, labels_range;

function equal_arrays(arr1, arr2) {
    if (arr1.length != arr2.length) return false;
    for (let i in arr1) if (arr1[i] != arr2[i]) return false;
    return true;
}

function loadVisuals() {
    jQuery.getJSON('./ai_static/feat_lab_data.json', (data) => {
        featlab = data;
    
        features_mean = tf.tensor(featlab["features"]["mean"]);
        features_stddv = tf.tensor(featlab["features"]["stddv"]);
        features_ofst = tf.tensor(featlab["features"]["ofst"]);
        features_range = tf.tensor(featlab["features"]["range"]);
        
        for (let i in featlab["features"]['classes']){
            var obj = featlab["features"]['classes'][i];
            
            feature_sliders[i] = new RangeInput(obj["name"], obj["min"], obj["max"], 0.001);
            feature_sliders[i].attach(FEAT_PARENT_ID);
            feature_sliders[i].render(obj["default"]);
        }
    
        labels_mean = tf.tensor(featlab["labels"]["mean"]);
        labels_stddv = tf.tensor(featlab["labels"]["stddv"]);
        labels_ofst = tf.tensor(featlab["labels"]["ofst"]);
        labels_range = tf.tensor(featlab["labels"]["range"]);
    
        for (let i in featlab["labels"]['classes']){
            var obj = featlab["labels"]['classes'][i];
    
            if (obj['labelType'] == "IntClass"){
                label_vis[i] = new IntClassDisplay(obj["name"], obj["size"]);
                obj["default"] = 0;}
            else if (obj['labelType'] == "IntClassMap"){
                label_vis[i] = new IntClassMapDisplay(obj["name"], obj["rev_map"]);
                obj["default"] = Math.min(...Object.keys(obj["rev_map"]));}
            
            label_vis[i].attach(LAB_PARENT_ID);
            label_vis[i].render(obj["default"]);
        }
    
        vis_loaded = true;
    });
}

function getVals(){
    var ret = [];
    for (let i in feature_sliders){
        ret.push(Number(feature_sliders[i].get_value()));
    }
    return ret;
}

async function loadModel() {
    model = await tf.loadLayersModel('./ai_static/tfjs_model/model.json');
    setInterval(check, 50);
}

function check() {
    if (vis_loaded){
        var newvals = getVals();
        if (!equal_arrays(newvals, oldvals)) {
            oldvals = newvals;
            predictDisplay(newvals);
        }
    }
}

function normalize(tensor, m, s, o, r) {
    return tf.div(tf.sub(tf.div(tf.sub(tensor, m), s), o), r);
}

function denormalize(tensor, m, s, o, r) {
    return tf.add(tf.mul(tf.add(tf.mul(tensor, r), o), s), m);
}

async function predictDisplay(val) {
    const norm = normalize(
        tf.tensor(val), features_mean, features_stddv, features_ofst, features_range
    )
    const input = norm.expandDims(0);
    const prediction = denormalize(
        model.predict(input), labels_mean, labels_stddv, labels_ofst, labels_range
    );
    const results = await tf.round(prediction.squeeze(0)).array();

    for (let i in label_vis){
        label_vis[i].set_value(Math.round(results[i]));
    }
}

setTimeout(loadVisuals, 500);
setTimeout(loadModel, 500);
