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
              img_url: 'https://placehold.jp/300x150.png'
            },
            modal: {
              conditions: {
                ref_regex: '/statics/second'
              }
            }
          }
        },
        {
          path_regexp: '^/statics/second',
          page_chatlinks: {
            banner: {
              img_url: 'https://placehold.jp/150x150.png'
            },
            modal: {
              conditions: {
                wait_for: 3
              }
            }
          }
        },
        {
          path_regexp: '^/statics/third',
          page_chatlinks: {
            modal: {
              conditions: {
                transition_count: 3
              }
            }
          }
        }
      ]
    }.to_json
  end
end
