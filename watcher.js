class ObjectWatcher {
    
    constructor (object, watcher, name = '') {
        this.watcher = watcher;
        this.object  = object;
        this.name = name;
    }
    
}

function SetProxies (ow) {
    let { object, watcher, name } = ow;

    return new Proxy(ow, {
        set: (tar, prop, val, rec) => {
            let prop_name = `${name? name + '.' : ''}${prop}`;
            
            let value = typeof val === "object"? 
                Watcher(val, watcher, prop_name) : val;
            
            object[prop] = value;
            
            watcher({ prop_name, prop, original_value: val, owner_name: name, tar, rec, value });
            
            return false;
        },

        get: (tar, prop, val, rec) => {
            return object[prop];
        }
    });
}

let Watcher = module.exports = (...args) => SetProxies(new ObjectWatcher(...args));