let gameSpeed = 1;

const BLUE =   { r: 0x67, g: 0xd7, b: 0xf0 };
const GREEN =  { r: 0xa6, g: 0xe0, b: 0x2c };
const PINK =   { r: 0xfa, g: 0x24, b: 0x73 };
const ORANGE = { r: 0xfe, g: 0x95, b: 0x22 };
const allColors = [BLUE, GREEN, PINK, ORANGE];
const getSpawnDelay = () => {
	const spawnDelayMax = 1400;
	const spawnDelayMin = 550;
	const spawnDelay = spawnDelayMax - state.game.cubeCount * 3.1;
	return Math.max(spawnDelay, spawnDelayMin);
}

const doubleStrongEnableScore = 2000;
const slowmoThreshold = 10;
const strongThreshold = 25;
const spinnerThreshold = 25;

let pointerIsDown = false;
let pointerScreen = { x: 0, y: 0 };
let pointerScene = { x: 0, y: 0 };

const minPointerSpeed = 60;
const hitDampening = 0.1;
const backboardZ = -400;
const shadowColor = '#262e36';
const airDrag = 0.022;
const gravity = 0.3;
const sparkColor = 'rgba(170,221,255,.9)';
const sparkThickness = 2.2;
const airDragSpark = 0.1;
const touchTrailColor = 'rgba(170,221,255,.62)';
const touchTrailThickness = 7;
const touchPointLife = 120;
const touchPoints = [];
const targetRadius = 40;
const targetHitRadius = 50;
const makeTargetGlueColor = target => {

	return 'rgb(170,221,255)';
};

const fragRadius = targetRadius / 3;
const canvas = document.querySelector('#c');
const cameraDistance = 900;
const sceneScale = 1;
const cameraFadeStartZ = 0.45*cameraDistance;
const cameraFadeEndZ = 0.65*cameraDistance;
const cameraFadeRange = cameraFadeEndZ - cameraFadeStartZ;
const allVertices = [];
const allPolys = [];
const allShadowVertices = [];
const allShadowPolys = [];
