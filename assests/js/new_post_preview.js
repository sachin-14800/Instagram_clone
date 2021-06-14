
new_post_preview.onchange = ()=> {
    const [file] = new_post_preview.files
    if (file) {
      blah.src = URL.createObjectURL(file)
    }
  }