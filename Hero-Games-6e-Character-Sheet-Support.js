(function() {
    oldCreateObj = createObj;
    createObj = function() {
        obj = oldCreateObj.apply(this, arguments);
        if (obj.get("_type") == 'attribute') obj.fbpath = '/char-attribs/char/'+ obj.get("_characterid") +'/'+ obj.get("_id");
        return obj;
    }
}())

var Phase_list = [
    "1   2   3   4   5   6   ?   8   9   10   11  12",
    "1   2   3   4   5   ?   7   8   9   10   11  ?",
    "1   2   3   ?   5   6   7   ?   9   10   11  ?",
    "1   2   ?   4   5   ?   7   8   ?   10   11  ?",
    "1   2   ?   4   ?   6   7   ?   9   ?   11  ?",
    "1   ?   3   ?   5   ?   7   ?   9   ?   11  ?",
    "1   ?   3   ?   5   ?   ?   8   ?   10   ?  ?",
    "1   ?   ?   4   ?   ?   7   ?   ?   10   ?  ?",
    "1   ?   ?   ?   5   ?   ?   ?   9   ?   ?  ?",
    "1   ?   ?   ?   ?   ?   7   ?   ?   ?   ?  ?",
    "1   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?  ?",
    "?   ?   ?   ?   ?   ?   ?   ?   ?   ?   ?  ?"];
    
function setup(obj, attr, base) {
    attribute = findObjs({
        _type: "attribute",
        _characterid: obj.get("_id"),
        name: attr
    })[0];
    if (attribute == undefined) {
        object = createObj("attribute", {
            _characterid: obj.get("_id"),
            name: attr,
            current: base,
            max: base,
        });
    }
    return;
}

on("ready", function(){
    on("add:character", function(obj) {
        setup(obj, "Phases_display", " 1   2   3   4   5   ?   7   8   9   10   11  ?");
        setup(obj, "SPD", "2");
        setup(obj, "END", "20");
        setup(obj, "BODY", "10");
        setup(obj, "STUN", "20");
        setup(obj, "Skill_Total", "");
        setup(obj, "Pow_Total", "");
        setup(obj, "Comp_Total", "");
        for (i = 1; i < 49; i++) { 
            setup(obj, "Skill_Cost"+i, "");
        }
        for (i = 1; i < 36; i++) { 
            setup(obj, "Pow_Cost"+i, "");
        }
        for (i = 1; i < 10; i++) { 
            setup(obj, "Comp_Cost"+i, "");
        }
    });
});

on("change:attribute", function(obj, prev) {
    charName = getObj("character", obj.get("_characterid"));
    charID =  obj.get("_characterid");
    attr = obj.get("name");
    if( attr == "SPD") {
        Speed = obj.get("current");
        attribute = findObjs({
            _type: "attribute",
            _characterid: obj.get("_characterid"),
            name: "Phases_display"
        })[0];  
        attribute.set("current",Phase_list[Speed-1]);
        sendChat(charName.get("name"), "/me 's speed has become "+Speed);
    }
    if( attr.substring(0,10) == "Skill_Cost") {
        oldCost = prev["current"];
        newCost = obj.get("current");
        attribute = findObjs({
            _type: "attribute",
            _characterid: obj.get("_characterid"),
            name: "Skill_Total"
        })[0]; 
        change = newCost - oldCost;
        attribute.set("current",Number(attribute.get("current"))+change);
    }
    if( attr.substring(0,8) == "Pow_Cost") {
        oldCost = prev["current"];
        newCost = obj.get("current");
        attribute = findObjs({
            _type: "attribute",
            _characterid: obj.get("_characterid"),
            name: "Pow_Total"
        })[0]; 
        change = newCost - oldCost;
        attribute.set("current",Number(attribute.get("current"))+change);
    }
    if( attr.substring(0,9) == "Comp_Cost") {
        oldCost = prev["current"];
        newCost = obj.get("current");
        attribute = findObjs({
            _type: "attribute",
            _characterid: obj.get("_characterid"),
            name: "Comp_Total"
        })[0]; 
        change = newCost - oldCost;
        attribute.set("current",Number(attribute.get("current"))+change);
    }
});