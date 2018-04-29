import React from 'react'
import cx from 'classnames'
import './style.css'

export default ({ text, className }) => {
  const classes = cx('BouncingText', className)
  const textArray = text.split('')
  let amountOfSpaces = 0

  return (
    <div className={classes}>
      {textArray.map((letter, i) => {
        const delay = `${(i * 100) - (amountOfSpaces * 100)}ms`
        const styles = {
          animationDelay: delay
        }
        if (letter === ' ') {
          styles.width = '1rem'
          amountOfSpaces += 1
        }

        return (
          <mark
            key={`${letter}${i}`}
            className={letter}
            style={styles}
          >
            {letter}
          </mark>
        )
      })}
    </div>
  )
}
