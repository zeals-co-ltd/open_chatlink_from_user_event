# frozen_string_literal: true

class StaticsController < ApplicationController
  protect_from_forgery except: :plugin

  def top; end

  def second; end

  def third; end

  def plugin
    condition_open_modal.each do |key, val|
      cookies[key] = val
    end
    render :plugin
  end

  private

  def condition_open_modal
    {
      from_page: 'top',
      to_page: 'second'
    }
  end
end
