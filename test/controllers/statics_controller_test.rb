require 'test_helper'

class StaticsControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get statics_top_url
    assert_response :success
  end

  test "should get second" do
    get statics_second_url
    assert_response :success
  end

  test "should get third" do
    get statics_third_url
    assert_response :success
  end

end
