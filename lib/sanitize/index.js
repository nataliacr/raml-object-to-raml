var extend                  = require('xtend/mutable');
var is                      = require('../utils/is');
var sanitizeSchemas         = require('./schemas');
var sanitizeParameters      = require('./parameters');
var sanitizeDocumentation   = require('./documentation');
var sanitizeSecuritySchemes = require('./security-schemes');
var sanitizeResources       = require('./resources');
var sanitizeResourceTypes   = require('./resource-types');
var sanitizeTraits          = require('./traits');
var sanitizeSecuredBy       = require('./secured-by');
var sanitizeProtocols       = require('./protocols');
var sanitizeDataTypes       = require('./data-types');
var sanitizeAnnotationTypes = require('./annotation-types');
var sanitizeSelectedAnnotations = require('./selected-annotations');

/**
 * Transform a RAML object into a YAML compatible structure.
 *
 * @param  {Object} input
 * @param  {String} Param
 * @return {Object}
 */
module.exports = function (input, context) {
  var output = {};

  if (is.string(input.title)) {
    output.title = input.title;
  }

  if (is.string(input.usage)) {
    output.usage = input.usage;
  }

  if (is.string(input.description)) {
    output.description = input.description;
  }
  
  if (is.string(input.extends)) {
    output.extends = input.extends;
  }

  if (is.object(input.uses)) {
    output.uses = input.uses
  }

  if (is.string(input.version) || is.number(input.version)) {
    output.version = input.version;
  }

  if (is.string(input.mediaType)) {
    output.mediaType = input.mediaType;
  }

  if (is.string(input.baseUri)) {
    output.baseUri = input.baseUri;
  }

  if (is.string(input.extends)) {
    output.extends = input.extends;
  }

  if(context.version == '1.0' && input.selectedAnnotations && input.selectedAnnotations.length){
    sanitizeSelectedAnnotations(input.selectedAnnotations, output);
  }

  if (is.object(input.baseUriParameters)) {
    output.baseUriParameters = sanitizeParameters(input.baseUriParameters, context);
  }

  if (is.array(input.securedBy)) {
    output.securedBy = sanitizeSecuredBy(input.securedBy, context);
  }

  if (is.array(input.documentation)) {
    output.documentation = sanitizeDocumentation(input.documentation, context);
  }

  if (context.version == '1.0') {
    if (is.array(input.types)) {
      output.types = sanitizeDataTypes(input.types, context);
    }
  }

  if (context.version == '1.0') {
    if (is.array(input.annotationTypes)) {
      output.annotationTypes = sanitizeAnnotationTypes(input.annotationTypes, context);
    }
  }

  if (is.array(input.securitySchemes)) {
    output.securitySchemes = sanitizeSecuritySchemes(input.securitySchemes, context);
  }

  if (is.array(input.schemas)) {
    output.schemas = sanitizeSchemas(input.schemas, context);
  }

  if (is.array(input.protocols)) {
    output.protocols = sanitizeProtocols(input.protocols, context);
  }

  if (is.array(input.resourceTypes)) {
    output.resourceTypes = sanitizeResourceTypes(input.resourceTypes, context);
  }

  if (is.array(input.traits)) {
    output.traits = sanitizeTraits(input.traits, context);
  }

  if (is.array(input.resources)) {
    extend(output, sanitizeResources(input.resources, context));
  }

  return output;
};
