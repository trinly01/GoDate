import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GoDate from '~/components/GoDate.vue'

describe('GoDate Component', () => {
  it('renders correctly with initial modelValue', async () => {
    const wrapper = mount(GoDate, {
      props: {
        modelValue: '01/01/2020',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('01/01/2020')
  })

  it('updates the modelValue when input changes', async () => {
    const wrapper = mount(GoDate, {
      props: {
        modelValue: '01/01/2020',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('12/31/2020')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['12/31/2020'])
  })

  it('shows an error message for an invalid date', async () => {
    const wrapper = mount(GoDate, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('invalid date')
    expect(wrapper.text()).toContain('Invalid Date')
  })
})