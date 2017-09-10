const waypoints = require('../data/waypoints.json')
const haversine = require('./haversine')

const transform_waypoints = require('./transform-waypoints')(haversine)

console.log(transform_waypoints(waypoints))
