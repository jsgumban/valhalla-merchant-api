const { Resource, ResourceCollection } = require('@senhung/http-resource');

class MerchantResource extends Resource {
   toJson(resource) {
      return {
         id: resource.id,
         name: resource.attributes.name,
         logo: resource.attributes.logo,
         members: resource.relations.members ? MemberResource.collection(resource.relations.members.models).response() : [],
      }
   }
}

module.exports = {
   make:       (resource)  => new MerchantResource(resource),
   collection: (resources) => new ResourceCollection(resources, MerchantResource),
};
