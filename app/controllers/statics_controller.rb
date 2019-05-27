# frozen_string_literal: true

class StaticsController < ApplicationController
  protect_from_forgery except: :plugin

  def top; end

  def second; end

  def third; end

  def plugin
    cookies[:fanp_chatlink_conditions] = condition_open_modal_json
    render :plugin
  end

  private

  def condition_open_modal_json
    {
      paterns: [
        {
          path_regexp: '^/statics/top',
          page_chatlinks: {
            banner: {
              img_url: ''
            },
            modal: {
              conditions: {
                wait_for: 30,
                ref: '^/statics/second',
                transition_count: 2
              }
            }
          }
        },
        {
          path_regexp: '^/statics/second',
          page_chatlinks: {
            banner: {
              img_url: ''
            },
            modal: {
              conditions: {
                wait_for: 30,
                ref: '^/statics/third'
              }
            }
          }
        },
        {
          path_regexp: '^/statics/third',
          page_chatlinks: {
            modal: {
              condition: {
                wait_for: 30
              }
            }
          }
        }
      ]
    }.to_json
  end
end
