/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import MapCard from '@/components/MapCard.vue'

describe('MapCard.vue', () => {
  it('renders props when passed', () => {
    const name = 'Germany'
    const population = '83240525'
    const region = 'Europe'
    const capital = 'Berlin'
    const flag = 'https://flagcdn.com/de.svg'
    const wrapper = shallowMount(MapCard, {
      props: { name, population, region, capital, flag }
    })
    expect(wrapper.text()).toMatch(name, population, region, capital, flag)
  })
})
