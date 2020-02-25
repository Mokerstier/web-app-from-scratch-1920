export function createElement(tag, { options, children }) {
    const element = document.createElement(tag)
    
    if (options.classNames) {
        options.classNames.forEach(className =>{
            element.classList.add(className)
        })
    }
    if (options.text) {
      element.innerText = options.text
    }
    if (options.src){
      element.setAttribute('src', options.src)
    }
    if (children){
      children.forEach(child => {
        element.appendChild(child)
      });
    }
    return element
  }