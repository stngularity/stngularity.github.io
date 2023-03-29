let activeIndex = 0;

window.onwheel = (event) => {
    if(event.altKey || event.ctrlKey)
        return;

    const sections = document.querySelectorAll("section"),
          nIndex = event.deltaY < 0 ? activeIndex-1 : activeIndex+1

    sections[activeIndex].classList.remove("active")
    activeIndex = Math.max(Math.min(nIndex, sections.length-1), 0);
    sections[activeIndex].classList.add("active");
}

window.onkeydown = (event) => {
    if(!event.keyCode in [38, 40])
        return;

    const sections = document.querySelectorAll("section");
    let nIndex = activeIndex;

    if(event.keyCode === 38)
        nIndex--;
    
    else if(event.keyCode === 40)
        nIndex++;

    sections[activeIndex].classList.remove("active")
    activeIndex = Math.max(Math.min(nIndex, sections.length-1), 0);
    sections[activeIndex].classList.add("active");
}

window.onhashchange = (event) => {
    const oldHash = event.oldURL.split("#")[1];
          newHash = window.location.hash;

    document.querySelector(`section#${oldHash}`).classList.remove("active");
    document.querySelector(`section${newHash}`).classList.add("active");
    window.scrollX = 0;
}