package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelOwnedpaintingsPaintings;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelOwnedpaintings
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseHotelOwnedpaintings   {
  @JsonProperty("paintings")
  @Valid
  private List<ResponseHotelOwnedpaintingsPaintings> paintings = null;

  public ResponseHotelOwnedpaintings paintings(List<ResponseHotelOwnedpaintingsPaintings> paintings) {
    this.paintings = paintings;
    return this;
  }

  public ResponseHotelOwnedpaintings addPaintingsItem(ResponseHotelOwnedpaintingsPaintings paintingsItem) {
    if (this.paintings == null) {
      this.paintings = new ArrayList<>();
    }
    this.paintings.add(paintingsItem);
    return this;
  }

  /**
   * Get paintings
   * @return paintings
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelOwnedpaintingsPaintings> getPaintings() {
    return paintings;
  }

  public void setPaintings(List<ResponseHotelOwnedpaintingsPaintings> paintings) {
    this.paintings = paintings;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelOwnedpaintings responseHotelOwnedpaintings = (ResponseHotelOwnedpaintings) o;
    return Objects.equals(this.paintings, responseHotelOwnedpaintings.paintings);
  }

  @Override
  public int hashCode() {
    return Objects.hash(paintings);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelOwnedpaintings {\n");
    
    sb.append("    paintings: ").append(toIndentedString(paintings)).append("\n");
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
