function generateOutput(input: string, output: string) {
  // 如果当前的output为 0 ，除了输入.以外，其余的都直接将output替换成input
  // 如果当前的output不为0，或者长度大于1，则直接在后面拼接字符串
  // 如果检测到有一个.直接return
  if ('1234567890.'.indexOf(input) >= 0) {
    if (output.indexOf('.') >= 0 && input === '.') return output;
    if (output === '0' && input !== '.') {
      output = input;
    } else {
      output += input;
    }
    return output;
  }
  if (input === '删除') {
    return output.slice(0, -1) || '0';
  }
  if (input === '清空') {
    return '0';
  }
  return '0';
}

export {generateOutput};