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