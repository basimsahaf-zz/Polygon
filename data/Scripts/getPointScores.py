import numpy as np
import json
import os
from getHexagons import hex_from_point


def getPointScore(gridPoint, landmarkPoints):
	score = 0.
	scale = len(landmarkPoints)

	gx, gy = gridPoint
	for lx, ly in landmarkPoints:
		dist = np.sqrt((gx-lx)**2 + (gy-ly)**2)
		score += 1. / dist
	score /= 1. * scale
	return score


def getScore(gridPoints_file, filenames, order_of_ds, polygon_file=None):
	gridPoints = []
	with open(gridPoints_file) as f:
		for line in f:
			p = line.split(',') # point/coordinate
			p = [float(x.strip()) for x in p]
			gridPoints.append(p)

	num_scores = len(filenames)
	all_scores = []
	for i, filename in enumerate(filenames):
		lps = []
		with open(filename) as f:
			for line in f:
				p = line.split(',')
				p = [float(x.strip()) for x in p]
				lps.append(p)

		scores = []
		for gp in gridPoints:
			score = getPointScore(gp, lps)
			scores.append(score)
		all_scores.append(scores)

	all_scores = np.array(all_scores)
	x, y = all_scores.shape # Reshape to make first dim be map to each point/coordinate
	all_scores = all_scores.reshape(y, x)
	all_scores = all_scores.tolist()

	scores_out = []
	for point, scores in zip(gridPoints, all_scores):
		polygon = hex_from_point((float(point[0]), float(point[1])))

		coordinate = {'lat': point[0], 'lng': point[1]}
		score_json = {}
		point = {'coordinate': coordinate}
		for ds, score in zip(order_of_ds, scores):
			score_json[ds] = score
		point['score'] = score_json

		pgon = []
		for p in polygon:
			pgon.append({'lat': p[0], 'lng': p[1]})
		point['polygon'] = pgon
		scores_out.append(point)

	points = {'points': scores_out}
	points_json = json.dumps(points)
	print(points_json)


files = [
		'../datasets/food_places.csv',
		'../datasets/parks.csv',
		'../datasets/post_secondary_schools.csv',
		'../datasets/rec_facil.csv',
		'../datasets/schools.csv',
		'../datasets/transit_points.csv',

]
ds_names = [
		'Food Score',
		'Parks Score',
		'Post Secondary Schools Score',
		'Recreation Score',
		'School Score',
		'Transit Score',
]


getScore('caglary_grid_points.csv', files, ds_names)
