var entity = require('basis.entity');
var Filter = require('basis.data.dataset').Filter;
var Module = require('./module');
var Point = require('./point');
var Variable = require('./variable');

var ModuleLink = entity.createType('ModuleLink', {
    from: entity.StringId,
    to: entity.StringId,
    position: Point,
    variable: Variable
});

ModuleLink.allWrapper = new Filter({
    source: ModuleLink.all,
    rule: function(link) {
        return Module.allWrapper.has(Module(link.data.from)) && Module.allWrapper.has(Module(link.data.to));
    }
});
Module.allWrapper.addHandler({
    itemsChanged: function() {
        ModuleLink.allWrapper.applyRule();
    }
});

module.exports = ModuleLink;
