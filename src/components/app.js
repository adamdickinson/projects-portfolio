import { h, Component } from 'preact'
import { Router } from 'preact-router'
import MaterialIcon from "material-icons-react"

import BezierEasing from "bezier-easing"
import Header from './header'

import berlin from "../assets/berlin.jpg"
import coffee from "../assets/coffee.jpg"
import computers from "../assets/computers.jpg"
import phone from "../assets/phone.jpg"

import profile from "../assets/profile.png"
import downArrow from "../assets/down.svg"

import barefoot from "../assets/barefoot.png"
import crown from "../assets/crown.png"
import merivale from "../assets/merivale.png"
import mfb from "../assets/mfb.png"
import platform from "../assets/platform.png"



if (module.hot) require('preact/debug')



export default class App extends Component {

  componentDidMount() {
    this.easing = BezierEasing(0.4, 0.0, 0.2, 1.0)

    this.scrolling = new Proxy(
      {
        items: app.querySelectorAll("section"),
        itemIndex: 0
      },
      {
        set: (obj, prop, value) => {
          if( prop == "itemIndex" ) {
            value = Math.min(this.scrolling.items.length - 1, Math.max(0, value))
            this.scrollToIndex(this.scrolling.itemIndex, value)
          }

          obj[prop] = value
          return true
        }
      }
    )

    document.addEventListener("wheel", e => { 
      e.preventDefault()
      if( !this.scrolling.active )
        e.deltaY > 0 ? this.scrolling.itemIndex++ : this.scrolling.itemIndex-- 
    }, false)
  }


  
  scrollToIndex(fromIndex, toIndex) {
    this.scrolling.active = true
    this.updateScroll(Date.now(), fromIndex, toIndex)
  }



  updateScroll(startedAt, fromIndex, toIndex) {
    const delta = Math.min(Date.now() - startedAt, 750)
    const indexChange = toIndex - fromIndex
    document.querySelector("html").scrollTop = window.innerHeight * (fromIndex + indexChange * this.easing(delta / 750))

    if( delta == 750 ) {
      this.scrolling.active = false
      return
    }

    window.requestAnimationFrame(() => this.updateScroll(startedAt, fromIndex, toIndex))
  }



  render(props) {
    return (
      <div id="app" ref={ref => this.app = ref }>
        <nav>
          <button className="down"><img src={downArrow} /></button>
        </nav>

        <section style={{ backgroundImage: `url(${berlin})` }}>
          <div className="background" />
          <img src={profile} />
          <h2>
            Adam Dickinson<br />
            <small>Personal Resum&eacute;</small>
          </h2>
          <p>
            <a href="mailto:adam@renegadedigital.com.au" className="button square red"><MaterialIcon icon="email" /></a>
            <a href="tel:0437251342" className="button square purple"><MaterialIcon icon="phone" /></a>
          </p>
        </section>

        <section style={{ backgroundImage: `url(${computers})` }}>
          <h1>Hi there!</h1>
          <p>
            <strong>I'm a proud Renegade, and have been for the last 6 years.</strong><br />
            I code, I design, I manage projects, I run the business.
          </p>
          <p>
            I've been working as a professional coder for the past 10 years, and working as a professional 
            designer for the past 5. I've worked with a great many tools, frameworks, languages and operating 
            systems. Here's the short version:
          </p>
          <p className="center">
            <strong>
              HTML/CSS (10 years)<br />
              PHP (9 years)<br />
              NodeJS (2 years)<br />
              ReactJS (2 years)
            </strong>
          </p>
          <p>
            When it comes to design, I prefer Affinity Designer over Adobe Photoshop/Illustrator, but have many 
            years experience with both.
          </p>
        </section>

        <section style={{ backgroundImage: `url(${coffee})` }}>
          <h1>Experience</h1>

          <p className="emphasized">Many industries, many people, one focus.</p>
          <p>
            One Year <strong>Rock Paper Scissors</strong> - In-House Web Developer<br />
            One Year <strong>The Real Estate Helpers</strong> - In-House Web Developer<br />
            Two Years <strong>Night &amp; Day Communications</strong> - Mid Weight Web Developer<br />
            Three Years <strong>The Creative People</strong> - Web/WordPress Developer<br />
            Four Years <strong>Freelance</strong> - Web Designer/Developer<br />
            Six Years <strong>Renegade Digital</strong> - Founder
          </p>

          <p className="headerlike">
            As a Renegade, I've worked with<br />
            <span className="dim">(among many others):</span>
          </p>

          <div className="wide">
            <img src={mfb} />
            <img src={platform} />
            <img src={barefoot} />
            <img src={crown} />
            <img src={merivale} />
          </div>
        </section>

        <section style={{ backgroundImage: `url(${phone})` }}>
          <h1>Contact</h1>
          <p className="emphasized">Based in Melbourne (for now).</p>
          <p>
            Reach me directly on <strong><a href="tel:0437251342">0437 251 342</a></strong> &ndash; always happy to chat!<br />
            Or email me at <strong><a href="mailto:adam@renegadedigital.com.au">adam@renegadedigital.com.au</a></strong>.
          </p>
        </section>

      </div>
    )
  }

}
