// will hide this section once logged in
const loginSectionElem = document.querySelector('.loginSection');
// below I have referenced the button itself
const loginSectionBtnElem = document.querySelector('.loginbtn');
// this 2 elements represents two hidden sections that I would want to unhide
const garmentsResultsSectionElem = document.querySelector('.garmentsResultsSection');
const topSectionElem = document.querySelector('.topSection');

const loginScreenToggle = () => {
    loginSectionElem.classList.toggle('hidden');
}

const showHiddenSections = () => {
    garmentsResultsSectionElem.classList.toggle('hidden');
    topSectionElem.classList.toggle('hidden');
}