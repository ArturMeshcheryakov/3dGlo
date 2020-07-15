const team = () => {
  const command = document.querySelector('.command');

  const mouseHover = (event) => {
    let target = event.target;
    const commandPhoto = target.closest('.command__photo');

    if (commandPhoto) {
      const src = target.getAttribute('src');

      target.setAttribute('src', target.getAttribute('data-img'));
      target.setAttribute('data-img', src);
    }
  };

  command.addEventListener('mouseover', (event) => {
    mouseHover(event);
  });

  command.addEventListener('mouseout', (event) => {
    mouseHover(event);
  });
};

export default team;