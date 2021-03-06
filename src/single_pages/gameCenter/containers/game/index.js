import Judge from './scripts/judge'

import Map from './scripts/ClassGrid/Map'
import Canvas from './scripts/ClassGrid/Canvas'
import GameGrid from './scripts/ClassGrid/GameGrid'
import EditorGrid from './scripts/ClassGrid/EditorGrid'
import ProfileGrid from './scripts/ClassGrid/ProfileGrid'

import Player from './scripts/ClassTank/Player'
import EnemyBase from './scripts/ClassTank/EnemyBase'
import EnemyController from './scripts/ClassTank/EnemyController'

import FireManager from './scripts/ClassFire/FireManager'

/**
 * there are four layers in a screen that should be rendered in order:
 *  1.block, steel, water
 *  2.tank, fire
 *  3.grass, fire-boom
 *  4.powerful items
 */

export function enter(game) {
	let grid = new ProfileGrid(800,400,game)
	grid.init()
	grid.drawSplashScreen()
}

export function init(game) {

	//get map source
	let grid = new GameGrid(800,400)
	let map = new Map(800,400)

	const mapSourceList = Map.getMapList(),
		{ startPosition: [{ x, y }], enemies} = mapSourceList[0]

	let player = new Player(x,y,game)
	let enemyBases = enemies.map(item => new EnemyBase(item))
	let fireController = new FireManager()
	let enemyController = new EnemyController()
	//draw construction

	//draw tanks
	// grid.init()
	// grid.drawConstruction()
	grid.getAlley(true)
	grid._drawPlayer(x,y)
	player.init(fireController)

	//start moving frame by frame
	let frame = new Judge(grid, map, player, fireController, enemyBases, enemyController)

	let keyFrame = () => {
		grid.init(map)
		frame.go()
		animation = requestAnimationFrame(keyFrame)
		if(!game.animation) cancelAnimationFrame(animation)
	}
	let animation = window.requestAnimationFrame(keyFrame)
}

export function editMap(game, width, height) {
	//get map source
	let grid = new EditorGrid(800,400,game)
	let map = new Map(width, height)
	let canvas = new Canvas(grid, map)

	grid.init(map,canvas)
	grid.drawBorder()
	// grid.drawLine()
	console.log(213);
	//create some samples for user to pick
	grid.drawToolBar()
}