# README

## 参考json

```json
[
  {
    "path": "\t^/order/complete.php?order_id=",
    "condition": {
      "type": "wait",
      "minutes": 20,
      "child": {
        "path": "^/order/confirm.php?order_id=",
        "condition": {
          "type": "ref",
          "path": "^/top/"
        }
      }
    }
  }
]
```
