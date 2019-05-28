# README

## 参考json

```ruby
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
    :
    :
  ]
}
```
