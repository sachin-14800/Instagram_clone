//For previewing an image when trying to upload it.

new_post_preview.onchange = ()=> {
    const [file] = new_post_preview.files
    //if file is present then only display it
    if (file) {
      blah.src = URL.createObjectURL(file)
    }
  }