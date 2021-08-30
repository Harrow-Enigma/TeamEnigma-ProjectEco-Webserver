function replace_space(str){
    return str.replace(/\s+/g, "_");
}

class RangeInput{
    constructor(name, min, max, step, id=null, parent_id=null) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.step = step;
        this.parent_id = parent_id;

        if (id == null) this.id = replace_space(name);
    }
    // hey what's up George
    // Probably shd've used bootstrap js api here, but u know
    // nice classes
    attach(parent_id) {
        this.parent_id = parent_id;
    }

    get_value() {
        return this.slider.value;
    }

    render(val=null) {
        if (val == null) val = this.min;

        this.parent = document.getElementById(this.parent_id);
        var sliderclass = this.parent.getAttribute("slider_class");
        
        this.slider = document.createElement("input");
        this.slider.id = this.id + '_slider';

        this.text = document.createElement("label");
        this.text.id = this.id + '_text';

        this.slider.className = "form-range" + " " + sliderclass;
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", this.min);
        this.slider.setAttribute("max", this.max);
        this.slider.setAttribute("step", this.step);
        this.slider.setAttribute("range_name", this.name);
        this.slider.setAttribute("text_id", this.text.id);
        
        this.slider.value = val;
        this.slider.addEventListener('input', function() {
            var text_id = this.getAttribute("text_id");
            var label = document.getElementById(text_id);
            var range_name = this.getAttribute("range_name");
            var val = Number(this.value);
            label.innerHTML = range_name + ": " + val.toFixed(3);
        }, false);
        
        this.text.className = "form-label";
        this.text.innerHTML = this.name + ": " + val.toFixed(3);
        this.text.setAttribute("for", this.slider.id);
        this.text.setAttribute("parent_name", this.name);
        
        this.parent.appendChild(this.text);
        this.parent.appendChild(this.slider);
    }
}

class IntClassDisplay{
    constructor(name, size, id=null, parent_id=null) {
        this.name = name;
        this.min = 1;
        this.max = size;
        this.range = size;
        this.parent_id = parent_id;

        if (id == null) this.id = replace_space(name);
    }

    attach(parent_id) {
        this.parent_id = parent_id;
    }

    set_value(val) {
        this.bar.setAttribute("aria-valuenow", String(val));
        //this.bar.innerHTML = String(val);
        var prog = ((val + 1) * 100) / this.range;
        this.bar.style.width = prog + "%";
        this.text.innerHTML = this.name + ": " + (val + 1);
    }

    render(val) {
        this.parent = document.getElementById(this.parent_id);
        var containerclass = this.parent.getAttribute("container_class");
        var barclass = this.parent.getAttribute("bar_class");
        var textclass = this.parent.getAttribute("text_class");
        
        this.container = document.createElement("div");

        this.bar = document.createElement("div");
        this.bar.id = this.id + '_bar';

        this.text = document.createElement("label");
        this.text.id = this.id + '_text';
        
        this.container.className = "progress progress-display" + " " + containerclass;

        this.bar.className = "progress-bar" + " " + barclass;
        this.bar.setAttribute("role", "progressbar");
        this.bar.setAttribute("aria-valuemin", this.min);
        this.bar.setAttribute("aria-valuemax", this.max);
        this.set_value(val);
        
        this.text.className = textclass;

        this.parent.appendChild(this.text);
        this.parent.appendChild(this.container);
        this.container.appendChild(this.bar);
    }
}

class IntClassMapDisplay{
    constructor(name, rev_map, id=null, parent_id=null) {
        this.name = name;
        this.keys = Object.keys(rev_map);
        this.rev_map = rev_map;
        this.min = Math.min(...this.keys);
        this.max = Math.max(...this.keys);
        this.parent_id = parent_id;

        if (id == null) this.id = replace_space(name);
    }

    attach(parent_id) {
        this.parent_id = parent_id;
    }

    set_value(val) {
        this.bar.setAttribute("aria-valuenow", String(val));
        //this.bar.innerHTML = this.rev_map[String(val)];
        var prog = ((val - this.min) * 100) / (this.max - this.min);
        this.bar.style.width = prog + "%";
        this.text.innerHTML = this.name + ": " + this.rev_map[String(val)];
    }

    render(val) {
        this.parent = document.getElementById(this.parent_id);
        var containerclass = this.parent.getAttribute("container_class");
        var barclass = this.parent.getAttribute("bar_class");
        var textclass = this.parent.getAttribute("text_class");
        
        this.container = document.createElement("div");

        this.bar = document.createElement("div");
        this.bar.id = this.id + '_bar';

        this.text = document.createElement("label");
        this.text.id = this.id + '_text';
        
        this.container.className = "progress progress-display" + " " + containerclass;

        this.bar.className = "progress-bar" + " " + barclass;
        this.bar.setAttribute("role", "progressbar");
        this.bar.setAttribute("aria-valuemin", this.min);
        this.bar.setAttribute("aria-valuemax", this.max);
        this.set_value(val);
        
        this.text.className = textclass;

        this.parent.appendChild(this.text);
        this.parent.appendChild(this.container);
        this.container.appendChild(this.bar);
    }
}
