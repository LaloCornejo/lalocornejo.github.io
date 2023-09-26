const postList = document.querySelector("#Notepad");

export const setupNotes = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const notes = doc.data();
      const div = `
        <h2>${notes.content}</h2>
    `;
      html += div;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<h2>:)</h2>';
  }
};