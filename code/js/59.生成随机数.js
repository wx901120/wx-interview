const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
// Math.random的范围为[0,1),左闭右开，这也是为什么需要加1，因为这样才能包括上最大值