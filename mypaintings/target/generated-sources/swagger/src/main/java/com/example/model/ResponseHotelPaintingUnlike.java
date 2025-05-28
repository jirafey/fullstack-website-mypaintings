package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelPaintingUnlike
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseHotelPaintingUnlike   {
  @JsonProperty("message")
  private String message = null;

  @JsonProperty("likes_count")
  private Integer likesCount = null;

  public ResponseHotelPaintingUnlike message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   **/
  @Schema(example = "Like został usunięty.", description = "")
  
    public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ResponseHotelPaintingUnlike likesCount(Integer likesCount) {
    this.likesCount = likesCount;
    return this;
  }

  /**
   * Get likesCount
   * @return likesCount
   **/
  @Schema(example = "41", description = "")
  
    public Integer getLikesCount() {
    return likesCount;
  }

  public void setLikesCount(Integer likesCount) {
    this.likesCount = likesCount;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelPaintingUnlike responseHotelPaintingUnlike = (ResponseHotelPaintingUnlike) o;
    return Objects.equals(this.message, responseHotelPaintingUnlike.message) &&
        Objects.equals(this.likesCount, responseHotelPaintingUnlike.likesCount);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message, likesCount);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelPaintingUnlike {\n");
    
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    likesCount: ").append(toIndentedString(likesCount)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
