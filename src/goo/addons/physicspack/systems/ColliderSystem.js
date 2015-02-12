define([
	'goo/entities/systems/System'
],
function (System) {
	'use strict';

	/**
	 * Processes all entities with collider components, making sure they are up to date.
	 * @extends System
	 */
	function ColliderSystem() {
		System.call(this, 'ColliderSystem', ['ColliderComponent', 'TransformComponent']);

		this.priority = 1; // Should be processed after TransformSystem
	}
	ColliderSystem.prototype = Object.create(System.prototype);
	ColliderSystem.prototype.constructor = ColliderSystem;

	/**
	 * @private
	 * @param {array} entities
	 */
	ColliderSystem.prototype.process = function (entities) {
		var N = entities.length;

		for (var i = 0; i !== N; i++) {
			var entity = entities[i];
			var transformComp = entity.transformComponent;
			var colliderComp = entity.colliderComponent;

			colliderComp._updated = false;
			if (transformComp._updated) {
				entity.colliderComponent.updateWorldCollider();
				entity.colliderComponent._dirty = true;
			}
		}
	};

	return ColliderSystem;
});