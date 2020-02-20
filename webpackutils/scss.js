const fs = require('fs')
const path = require('path')
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
  return filelist;
}
const orderedList = startpath => {

  return walkSync(startpath)
  .map(path => {
    
    const cleanPath = path.split('\\')
                          .join('/')
                          .replace('src/story/callcenter/ambient/base/scss/visual/', '')
                          .replace('src/story/callcenter/ambient/base/scss/responsive/', '')
                          .replace('.scss', '')
    
    return {
      order: (cleanPath.match(/\//g) || []).length,
      path: cleanPath
    }
  })
  .sort((a, b) => {

    if (a.order > b.order) return 1;
    if (a.order < b.order) return -1;
    return 0;
  })
  .map(path => path.path)
  .filter(path => (
    path != 'main' &&
    path != 'variations'
  ))
  .map(path => '@import "' + path + '";')
  .join('\n')
}

var options = {
  visualpath: './src/story/callcenter/ambient/base/scss/visual',
  responsivepath: './src/story/callcenter/ambient/base/scss/responsive'
};

fs.writeFileSync(
  path.join(options.visualpath, '/main.scss'), 
  orderedList(options.visualpath)
)
fs.writeFileSync(
  path.join(options.responsivepath, '/main.scss'),
  orderedList(options.responsivepath)
)