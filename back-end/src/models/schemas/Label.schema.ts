interface LabelInterface {
  text?: string
  color: string
}
class Label {
  text: string
  color: string
  constructor({ text, color }: LabelInterface) {
    this.text = text || ''
    this.color = color
  }
}

export default Label
