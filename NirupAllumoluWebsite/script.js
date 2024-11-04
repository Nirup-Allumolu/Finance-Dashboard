function showSection(sectionId) {
    // Hide all sections
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Open default tab in the section if any
    var tabs = document.getElementById(sectionId).getElementsByClassName('tab');
    if (tabs.length > 0) {
        var tablinks = tabs[0].getElementsByTagName('button');
        if (tablinks.length > 0) {
            tablinks[0].click();
        }
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    var parentSection = evt.currentTarget.closest('.section');
    tabcontent = parentSection.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = parentSection.getElementsByClassName("tab")[0].getElementsByTagName("button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    parentSection.querySelector('#' + tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Show the intro section on page load
window.onload = function() {
    showSection('intro');
};
