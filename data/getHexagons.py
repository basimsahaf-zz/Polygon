import numpy as np
import json
import os

def hex_from_point(point, dist_horiz=0.0118347, dist_vert=0.00846393):
	x, y = point
	p1 = [x, 			y-dist_horiz]
	p2 = [x+dist_vert, 	y-(dist_horiz/2)]
	p3 = [x+dist_vert, 	y+(dist_horiz/2)]
	p4 = [x, 			y+dist_horiz]
	p5 = [x-dist_vert, 	y+(dist_horiz/2)]
	p6 = [x-dist_vert, 	y-(dist_horiz/2)]
	return [p1, p2, p3, p4, p5, p6]


def main(filename='caglary_grid_points.csv'):
	out_str = ''
	with open(filename) as f:
		for line in f:
			num_els = len(line.split(','))
			lat, lon = line.split(',')[-2:]
			lat, lon = float(lat), float(lon)

			polygon = hex_from_point((lat, lon))
			polygon_str = '['
			for (_lat, _lon) in polygon:
				polygon_str += '{'+'lat:'+str(_lat)+',lng:'+str(_lon)+'},'
			out_str += polygon_str + '],\n'

	file_save = 'calgary_hexagons.txt'
	with open(file_save, 'w') as f:
		f.write(out_str)


if __name__ == '__main__':
	main()