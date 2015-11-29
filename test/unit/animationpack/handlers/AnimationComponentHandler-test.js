describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World();
		loader = new DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = Configs.entity(['animation']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(AnimationComponent));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = Configs.entity(['animation']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(SkeletonPose));
			expect(component.layers[0]).toEqual(jasmine.any(AnimationLayer));
			done();
		});
	});
});