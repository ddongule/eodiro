import React, { useEffect, useState } from 'react'

import $ from './style.module.scss'
import Blocks from '@/components/global/icons/Blocks'
import Body from '@/layouts/BaseLayout/Body'
import Door from '@/components/global/icons/Door'
import EodiroColors from '@/modules/styles/EodiroColors'
import Grid from '@/layouts/Grid'
import Head from 'next/head'
import Heart from '@/components/global/icons/Heart'
import Link from 'next/link'
import { Magnifier } from '@/components/global/icons'
import { NextPage } from 'next'
import Notice from '@/components/home/Notice'
import Spoon from '@/components/global/icons/Spoon'
import classNames from 'classnames'

type HomeFeatureBoxProps = {
  title: string
  to: string
  Icon: JSX.Element
  label?: 'new' | 'update' | 'beta'
}

const HomeFeatureBox: React.FC<HomeFeatureBoxProps> = ({
  title,
  to,
  Icon,
  label,
}) => {
  return (
    <button className={$['feature-box']}>
      <div className={$['wrapper']}>
        {Icon}
        <h2 className={$['feature-name']}>{title}</h2>
        <Link href={to}>
          <a className="absolute-link" />
        </Link>

        {label !== undefined && (
          <span className={$['label']}>{label.toUpperCase()}</span>
        )}
      </div>
    </button>
  )
}

const Main: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const documentFonts = (document as any).fonts

    if (!documentFonts) {
      setTimeout(() => {
        setAnimate(true)
      }, 200)
    } else {
      documentFonts.ready.then(() => {
        setAnimate(true)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>어디로</title>
      </Head>
      <Body pageTitle="어디로" titleHidden centered>
        <div id={$['eodiro-home']}>
          <h1
            className={classNames(
              $['header'],
              `overlay-sentinel-spot title-sentinel-spot`
            )}
          >
            <div
              className={classNames($['text-wrapper'], animate && $['animate'])}
              onAnimationEnd={() => {
                setIsAnimated(true)
              }}
            >
              <span
                className={classNames($['name'], isAnimated && $['shadowed'])}
              >
                어디로
              </span>
            </div>
          </h1>
          <p className={$['manifesto']}>
            <span className={classNames($['text'], animate && $['animate'])}>
              중앙대 학생들만을 위한 특별한 서비스
            </span>
          </p>

          <div className={$['features']}>
            <Grid>
              <HomeFeatureBox
                title="빈 강의실"
                to="/vacant"
                Icon={
                  <Door fill={EodiroColors.secondary} className={$['icon']} />
                }
              />
              <HomeFeatureBox
                title="강의 검색"
                to="/lectures"
                Icon={
                  <Magnifier fill={EodiroColors.green1} className={$['icon']} />
                }
              />
              <HomeFeatureBox
                title="학식 메뉴"
                to="/cafeteria"
                Icon={<Spoon fill={EodiroColors.blue1} className={$['icon']} />}
              />
              <HomeFeatureBox
                title="빼빼로 광장"
                to="/square"
                Icon={
                  <Blocks fill={EodiroColors.pink1} className={$['icon']} />
                }
                label="beta"
              />
              <HomeFeatureBox
                title="오픈 소스"
                to="/opensource"
                Icon={
                  <Heart fill={EodiroColors.violet1} className={$['icon']} />
                }
                label="update"
              />
            </Grid>
          </div>
        </div>
      </Body>
    </>
  )
}

export default Main
