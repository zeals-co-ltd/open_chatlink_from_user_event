# frozen_string_literal: true

class StaticsController < ApplicationController
  def top; end

  def second; end

  def third; end

  def plugin
    render :plugin
  end
end
