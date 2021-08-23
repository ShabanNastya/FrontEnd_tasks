
const navigateTo = url => {
  history.pushState(null, null, url);
};

const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index+chunk_size);
      tempArray.push(myChunk);
  }

  return tempArray;
};

const audio = new Audio();

const playAudio = (pathToSound) => {
  audio.src = pathToSound;
  audio.autoplay = true;
}

const stopAudio = () => {
  audio.autoplay = false;
  audio.currentTime = 0.0;
  audio.pause();
}

export { chunkArray, navigateTo, playAudio, stopAudio };