const test = require('tape')

const {
	make_waypoints_to_segments,
	segments_to_categories,
} = require('../transform-waypoints')

test('segments_to_categories', t => {
	t.plan(4)

	const segments = [{
		distance: 10,
		duration: 5,
		is_speeding: false,
	}, {
		distance: 10,
		duration: 5,
		is_speeding: true,
	}]
	const result = segments_to_categories(segments)

	t.equal(result.total_distance, 20, 'total_distance sums all segments.')
	t.equal(result.speeding_distance, 10, 'speeding_distance sums speeding segments.')
	t.equal(result.total_duration, 10, 'total_duration sums all segments')
	t.equal(result.speeding_duration, 5, 'speeding_duration sums speeding segments.')
})

const fake_calculate_distance = (a, b) => 10

const waypoints = [{
	timestamp: 1000,
	speed: 5,
	speed_limit: 5,
	position: {},
}, {
	timestamp: 2000,
	speed: 10,
	speed_limit: 5,
	position: {},
}, {
	timestamp: 3000,
	speed: 5,
	speed_limit: 5,
	position: {},
}, {
	timestamp: 4000,
	speed: 10,
	speed_limit: 5,
	position: {},
}]

test('waypoints_to_segments should return (waypoints.length - 1) segments', t => {
	t.plan(3)

	const waypoints_to_segments = make_waypoints_to_segments(fake_calculate_distance)

	const lengths = [2, 3, 4]
	lengths.forEach(n => {
		const result = waypoints_to_segments(waypoints.slice(0, n))
		t.equal(result.length, n - 1, `${n} waypoints are transformed to ${result.length} segments`)
	})
})

test('waypoints_to_segments', t => {
	t.plan(3)

	const waypoints_to_segments = make_waypoints_to_segments(fake_calculate_distance)
	const segments = waypoints_to_segments(waypoints.slice(0, 2))
	const result = segments[0]

	t.equal(result.distance, 10, 'distance is the result of calling calculate_distance function.')
	t.equal(result.duration, 1000, 'duration is the difference between timestamps.')
	t.equal(result.is_speeding, true, 'is_speeding is true if the second waypoint speed is above speed limit.')
})
