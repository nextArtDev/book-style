'use client'
import { FC, ReactNode, useRef } from 'react'
import './rolling.scss'
import { motion, useInView } from 'framer-motion'

interface RollingProps {
  children: ReactNode
  imageUrl?: string
  className?: string
}

const Rolling: FC<RollingProps> = ({ children, imageUrl, className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div className={className}>
      <motion.figure
        className="imageRoll  "
        ref={ref}
        style={{
          '--imageUrl': `url(${imageUrl || ''})`,
        }}
      >
        <motion.i className={` ${isInView ? 'in-view' : ''}`}>
          <i>
            <i>
              <i>
                <i>
                  <i>
                    <i>
                      <i>
                        <i>
                          <i>
                            <i>
                              <i>
                                <i>
                                  <i>
                                    <i>
                                      <i>
                                        <i>
                                          <i>
                                            <i>
                                              <i>
                                                <i>
                                                  <i>
                                                    <i>
                                                      <i>
                                                        <i>
                                                          <i>
                                                            <i>
                                                              <i>
                                                                <i>
                                                                  <i>
                                                                    <i>
                                                                      <i>
                                                                        <i>
                                                                          <i>
                                                                            <i>
                                                                              <i>
                                                                                <i>
                                                                                  <i>
                                                                                    <i>
                                                                                      <i>
                                                                                        <i>
                                                                                          <i>
                                                                                            <i>
                                                                                              <i>
                                                                                                <i>
                                                                                                  <i>
                                                                                                    <i>
                                                                                                      <i>
                                                                                                        <i>
                                                                                                          <i>
                                                                                                            <i>
                                                                                                              <i>
                                                                                                                <i>
                                                                                                                  <i>
                                                                                                                    <i>
                                                                                                                      <i>
                                                                                                                        <i>
                                                                                                                          <i>
                                                                                                                            <i>
                                                                                                                              <i></i>
                                                                                                                            </i>
                                                                                                                          </i>
                                                                                                                        </i>
                                                                                                                      </i>
                                                                                                                    </i>
                                                                                                                  </i>
                                                                                                                </i>
                                                                                                              </i>
                                                                                                            </i>
                                                                                                          </i>
                                                                                                        </i>
                                                                                                      </i>
                                                                                                    </i>
                                                                                                  </i>
                                                                                                </i>
                                                                                              </i>
                                                                                            </i>
                                                                                          </i>
                                                                                        </i>
                                                                                      </i>
                                                                                    </i>
                                                                                  </i>
                                                                                </i>
                                                                              </i>
                                                                            </i>
                                                                          </i>
                                                                        </i>
                                                                      </i>
                                                                    </i>
                                                                  </i>
                                                                </i>
                                                              </i>
                                                            </i>
                                                          </i>
                                                        </i>
                                                      </i>
                                                    </i>
                                                  </i>
                                                </i>
                                              </i>
                                            </i>
                                          </i>
                                        </i>
                                      </i>
                                    </i>
                                  </i>
                                </i>
                              </i>
                            </i>
                          </i>
                        </i>
                      </i>
                    </i>
                  </i>
                </i>
              </i>
            </i>
          </i>
        </motion.i>
        <figcaption className="bg-light-bg dark:bg-dark-bg ">
          {/* Kitten: <strong>Ollie</strong> (12 Weeks) */}
          {children}
        </figcaption>
      </motion.figure>
    </div>
  )
}

export default Rolling
