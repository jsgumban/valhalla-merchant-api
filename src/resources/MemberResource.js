const { Resource, ResourceCollection } = require('@senhung/http-resource');

class MemberResource extends Resource {
   toJson(resource) {
      return {
         id: resource.id,
         merchant_id: resource.attributes.merchant_id,
         name: resource.attributes.name,
         email: resource.attributes.email,
      }
   }
}

module.exports = {
   make:       (resource)  => new MemberResource(resource),
   collection: (resources) => new ResourceCollection(resources, MemberResource),
};
